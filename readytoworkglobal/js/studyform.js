
// Create a reference
const storageRef = firebase.storage().ref("test/hello.txt");

// Upload a simple blob
const file = new Blob(["Hello world"], { type: "text/plain" });

storageRef.put(file)
  .then(snapshot => {
    console.log("Uploaded file:", snapshot.metadata.fullPath);
    return snapshot.ref.getDownloadURL();
  })
  .then(url => {
    console.log("File available at:", url);
  })
  .catch(err => console.error("Upload failed:", err));

document.getElementById("intentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const firstName = document.getElementById("firstName").value;
  const otherName = document.getElementById("otherName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const education = document.getElementById("education").value;
  const employment = document.getElementById("employment").value;
  const goals = document.getElementById("goals").value;
  const cvFile = document.getElementById("cvFile").files[0];

  try {
    // Upload CV to Firebase Storage
    const storageRef = ref(storage, `cv/${email}_${cvFile.name}`);
    await uploadBytes(storageRef, cvFile);
    const cvURL = await getDownloadURL(storageRef);

    // Save form data to Firestore
    await addDoc(collection(db, "applications"), {
      firstName,
      otherName,
      email,
      phone,
      country,
      city,
      education,
      employment,
      goals,
      cvURL,
      status: "Submitted",
      createdAt: new Date()
    });

    alert("Application submitted successfully!");
    e.target.reset();
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Failed to submit application. Please try again.");
  }
});
