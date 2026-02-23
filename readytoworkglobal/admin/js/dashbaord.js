function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

function updateDashboardCounts() {
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  let submittedToday = 0;
  let upcomingToday = 0;
  let allPending = 0;
  let approved30days = 0;

  firebase.database().ref("ConsultationBookings").once("value").then(snapshot => {
    snapshot.forEach(child => {
      const booking = child.val();

      // Submitted Today (created today)
      if (booking.CreatedAt && booking.CreatedAt.startsWith(todayStr)) {
        submittedToday++;
      }

      // Upcoming Today (meeting scheduled today and still active)
      if (booking.MeetingDate === todayStr && booking.Status === "Approved") {
        upcomingToday++;
      }

      // All Pending
      if (booking.Status === "Pending Confirmation") {
        allPending++;
      }

      // Approved in past 30 days
      if (booking.Status === "Approved") {
        const approvedDate = new Date(booking.MeetingDate);
        if (approvedDate >= thirtyDaysAgo && approvedDate <= now) {
          approved30days++;
        }
      }
    });

    // Update DOM
    document.getElementById("submittedToday").textContent = submittedToday;
    document.getElementById("upcomingToday").textContent = upcomingToday;
    document.getElementById("allPending").textContent = allPending;
    document.getElementById("approved30days").textContent = approved30days;
  });
}

updateDashboardCounts();