

function loadBookingsq() {
  const tbody = document.getElementById("bookingTableBody");
  db.ref("ConsultationBookings").on("value", snapshot => {
    tbody.innerHTML = ""; // clear table
    snapshot.forEach(child => {
      const booking = child.val();
      const emailKey = child.key; // sanitized email key

      const row = `
        <tr>
          <td>${booking.FullName}</td>
          <td>${booking.Email}</td>
          <td>${booking.Phone}</td>
          <td>${booking.MeetingType}</td>
          <td>${booking.MeetingDate}</td>
          <td>${booking.MeetingTime}</td>
          <td>${booking.MeetingLocation}</td>
          <td><span class="status ${booking.Status.toLowerCase()}">${booking.Status}</span></td>
          <td>
            <button class="btn approve" onclick="updateStatus('${emailKey}','Approved')">Approve</button>
            <button class="btn reschedule" onclick="updateStatus('${emailKey}','Rescheduled')">Reschedule</button>
            <button class="btn cancel" onclick="updateStatus('${emailKey}','Cancelled')">Cancel</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  });
}

function updateStatus(emailKey, newStatus) {
  db.ref("ConsultationBookings/" + emailKey).update({
    Status: newStatus,
    UpdatedAt: new Date().toISOString()
  });
}

//loadBookings();


function loadBookings() {
  const activeBody = document.getElementById("activeTableBody");
  const rescheduleBody = document.getElementById("rescheduleTableBody");
  const cancelBody = document.getElementById("cancelTableBody");

  db.ref("ConsultationBookings").on("value", snapshot => {
    activeBody.innerHTML = "";
    rescheduleBody.innerHTML = "";
    cancelBody.innerHTML = "";

    snapshot.forEach(child => {
      const booking = child.val();
      const emailKey = child.key;

      const row = `
        <tr>
          <td>${booking.FullName}</td>
          <td>${booking.Email}</td>
          <td>${booking.Phone}</td>
          <td>${booking.MeetingType}</td>
          <td>${booking.MeetingDate}</td>
          <td>${booking.MeetingTime}</td>
          <td>${booking.MeetingLocation}</td>
          <td><span class="status ${booking.Status.toLowerCase()}">${booking.Status}</span></td>
          <td>
            ${renderActions(emailKey, booking.Status)}
          </td>
        </tr>
      `;

      if (booking.Status === "Rescheduled") {
        rescheduleBody.innerHTML += row;
      } else if (booking.Status === "Cancelled") {
        cancelBody.innerHTML += row;
      } else {
        activeBody.innerHTML += row;
      }
    });
  });
}

function renderActions(emailKey, status) {
  if (status === "Rescheduled") {
    return `
      <button class="btn edit" onclick="editBooking('${emailKey}')">Edit</button>
      <button class="btn reopen" onclick="updateStatus('${emailKey}','Approved')">Confirm</button>
    `;
  } else if (status === "Cancelled") {
    return `
      <button class="btn edit" onclick="editBooking('${emailKey}')">Edit</button>
      <button class="btn reopen" onclick="updateStatus('${emailKey}','Approved')">Reopen</button>
    `;
  } else {
    return `
      <button class="btn approve" onclick="updateStatus('${emailKey}','Approved')">Approve</button>
      <button class="btn reschedule" onclick="updateStatus('${emailKey}','Rescheduled')">Reschedule</button>
      <button class="btn cancel" onclick="updateStatus('${emailKey}','Cancelled')">Cancel</button>
    `;
  }
}

function updateStatus(emailKey, newStatus) {
  db.ref("ConsultationBookings/" + emailKey).update({
    Status: newStatus,
    UpdatedAt: new Date().toISOString()
  });
}

function editBooking(emailKey) {
  // Example: open a modal or inline form to change date/time
  alert("Edit booking for: " + emailKey);
}
loadBookings();

// load summary data


function updateDashboardCards() {
  db.ref("ConsultationBookings").on("value", snapshot => {
    let total = 0;
    let today = 0;
    let pending = 0;

    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    snapshot.forEach(child => {
      const booking = child.val();
      total++;

      if (booking.MeetingDate === todayDate) {
        today++;
      }

      if (booking.Status === "Pending Confirmation" || booking.Status === "Pending Approval") {
        pending++;
      }
    });

    document.getElementById("totalBookings").textContent = total;
    document.getElementById("todayBookings").textContent = today;
    document.getElementById("pendingBookings").textContent = pending;
  });
}

updateDashboardCards();
// load today summary only
function updateDashboardCardsToday() {
  db.ref("ConsultationBookings").on("value", snapshot => {
    let onlineToday = 0;
    let phoneToday = 0;
    let officeToday = 0;

    const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    snapshot.forEach(child => {
      const booking = child.val();

      // Only count bookings scheduled for today
      if (booking.MeetingDate === todayDate) {
        if (booking.MeetingLocation === "virtual") {
          onlineToday++;
        } else if (booking.MeetingLocation === "phone") {
          phoneToday++;
        } else if (booking.MeetingLocation === "office") {
          officeToday++;
        }
      }
    });

    document.getElementById("onlineBookings").textContent = onlineToday;
    document.getElementById("phoneBookings").textContent = phoneToday;
    document.getElementById("officeBookings").textContent = officeToday;
  });
}

updateDashboardCardsToday();

// 30 day summary

function updateSummaryCardsMontly() {
  db.ref("ConsultationBookings").on("value", snapshot => {
    let bookingsLast30 = 0, bookingsNext30 = 0;
    let reschedulesLast30 = 0, reschedulesNext30 = 0;
    let cancellationsLast30 = 0, cancellationsNext30 = 0;

    const today = new Date();
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 30);
    const next30 = new Date(today);
    next30.setDate(today.getDate() + 30);

    snapshot.forEach(child => {
      const booking = child.val();
      const meetingDate = new Date(booking.MeetingDate);

      // Bookings
      if (meetingDate >= last30 && meetingDate <= today) {
        bookingsLast30++;
      }
      if (meetingDate > today && meetingDate <= next30) {
        bookingsNext30++;
      }

      // Reschedules
      if (booking.Status === "Rescheduled") {
        if (meetingDate >= last30 && meetingDate <= today) {
          reschedulesLast30++;
        }
        if (meetingDate > today && meetingDate <= next30) {
          reschedulesNext30++;
        }
      }

      // Cancellations
      if (booking.Status === "Cancelled") {
        if (meetingDate >= last30 && meetingDate <= today) {
          cancellationsLast30++;
        }
        if (meetingDate > today && meetingDate <= next30) {
          cancellationsNext30++;
        }
      }
    });

    // Update DOM
    document.getElementById("bookingsLast30").textContent = bookingsLast30;
    document.getElementById("bookingsNext30").textContent = bookingsNext30;
    document.getElementById("reschedulesLast30").textContent = reschedulesLast30;
    document.getElementById("reschedulesNext30").textContent = reschedulesNext30;
    document.getElementById("cancellationsLast30").textContent = cancellationsLast30;
    document.getElementById("cancellationsNext30").textContent = cancellationsNext30;
  });
}

updateSummaryCardsMontly();



// edit bookings
let currentEmailKey = null;

function editBooking(emailKey) {
  currentEmailKey = emailKey;
  document.getElementById("editModal").style.display = "block";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
  currentEmailKey = null;
}

function confirmEdit() {
  const newDate = document.getElementById("editDate").value;
  const newTime = document.getElementById("editTime").value;

  if (!newDate || !newTime) {
    alert("Please select both date and time.");
    return;
  }

  firebase.database().ref("ConsultationBookings/" + currentEmailKey).update({
    MeetingDate: newDate,
    MeetingTime: newTime,
    Status: "Approved", // moves back to Active table
    UpdatedAt: new Date().toISOString()
  });

  closeModal();
}

function reopenBooking() {
  firebase.database().ref("ConsultationBookings/" + currentEmailKey).update({
    Status: "Approved", // moves back to Active table
    UpdatedAt: new Date().toISOString()
  });

  closeModal();
}