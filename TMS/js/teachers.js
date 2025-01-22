
    const db = firebase.database();

    // Add teacher to Realtime Database
   // Add or Update Teacher in Realtime Database
    function standardizeInput(input) {
  return input.trim().toUpperCase(); // Convert to lowercase and remove any leading/trailing spaces
}
function standardizeInputGrade(input) {
  return input
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '') // Replace multiple spaces with a single space
    .toUpperCase(); // Convert to lowercase
}
document.getElementById('teacher-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values

    const name = document.getElementById('teacher-name').value;
  const email = document.getElementById('teacher-email').value;
  const subjects = document.getElementById('teacher-subjects').value
    .split(',')
    .map(subject => standardizeInput(subject)); // Standardize subjects
  const grades = document.getElementById('teacher-grades').value
    .split(',')
    .map(grade => standardizeInputGrade(grade)); // Standardize grades
  
  // Check if the edit-id is set (means we're updating)
  const id = document.getElementById('edit-id').value;

  if (id) {
    // Update the existing teacher
    firebase.database().ref('teachers/' + id).update({
      name: name,
      email: email,
      subjects: subjects,
      grades: grades
    }).then(() => {
      alert("Teacher updated successfully!");
      document.getElementById('teacher-form').reset(); // Clear the form
      loadTeachers(); // Refresh teacher list
      document.getElementById('edit-id').value = ''; // Reset the edit-id
    });
  } else {
    // Create a new teacher
    const newTeacherRef = db.ref('teachers').push();
    newTeacherRef.set({
      name: name,
      email: email,
      subjects: subjects,
      grades: grades
    }).then(() => {
      alert("New teacher added successfully!");
      document.getElementById('teacher-form').reset(); // Clear the form
      loadTeachers(); // Refresh teacher list
    });
  }
});

    // Load teachers from Realtime Database and display in table
    function loadTeachers() {
      const teacherList = document.getElementById('teacher-table');
      teacherList.innerHTML = ''; // Clear the list before loading

      // Fetch all teachers
      db.ref('teachers').once('value', function(snapshot) {
        if (snapshot.exists()) {
          const teachers = snapshot.val();
          for (const key in teachers) {
            const teacher = teachers[key];
            const row = document.createElement('tr');

            row.innerHTML = `
              <td>${teacher.name}</td>
              <td>${teacher.email}</td>
              <td>${teacher.subjects.join(', ')}</td>
              <td>${teacher.grades.join(', ')}</td>
              <td>
              <button onclick="editTeacher('${key}')">Edit</button> 
                <button onclick="deleteTeacher('${key}')">Delete</button>
              </td>
            `;

            teacherList.appendChild(row);
          }
        }
      });
    }

    // Delete teacher from Realtime Database
    function deleteTeacher(id) {
      db.ref('teachers/' + id).remove().then(() => {
        loadTeachers(); // Refresh the list
      });
    }

    // Load teachers on page load
    window.onload = loadTeachers;

    function editTeacher(id) {
  // Fetch teacher data by ID
  firebase.database().ref('teachers/' + id).once('value', (snapshot) => {
    const teacher = snapshot.val();
    
    // Populate form with teacher data for editing
    document.getElementById('teacher-name').value = teacher.name;
    document.getElementById('teacher-email').value = teacher.email;
    document.getElementById('teacher-subjects').value = teacher.subjects.join(', ');
    document.getElementById('teacher-grades').value = teacher.grades.join(', ');
    
    // Save the teacher ID for updating later
    document.getElementById('edit-id').value = id;
  });
}

// Update teacher info after editing
document.getElementById('teacher-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const id = document.getElementById('edit-id').value;
  if (id) {
    const updatedData = {
      name: document.getElementById('teacher-name').value,
      email: document.getElementById('teacher-email').value,
      subjects: document.getElementById('teacher-subjects').value.split(','),
      grades: document.getElementById('teacher-grades').value.split(',')
    };
    
    firebase.database().ref('teachers/' + id).update(updatedData);
    alert("Teacher updated successfully!");
  }
});
