let btnlogin = document.getElementById('btnlogin')
btnlogin.addEventListener("click", () =>{
	let txtusername = document.getElementById('txtusername').value
	let txtpass = document.getElementById('txtpass').value
	btnlogin.innerHTML = "Please wait ..."
	if (txtusername == "" || txtpass == ""){
		alert("Please fill all details.")
	}else{
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
		.then(() =>{
			return firebase.auth().signInWithEmailAndPassword(txtusername,txtpass)
		})
		.then((userCredential) => {
			let emailid = txtusername.replace(/\./g, "_dot_").replace(/@/g, "_at_")
			return firebase.database().ref("userDetails/" + emailid).once("value")
		})
		.then((snapshot) =>{
			const userDetails = snapshot.val()
			const role = userDetails.Role
			const status = userDetails.Status
			if (status == "active"){
				if(role == "Admin"){
					// admin
				window.location.href = "dashboard.html"
				}else if(role == "Student"){
					// studnet
				alert("Studnet logged in ")
				}else{
					// active users with no roles
				alert("No role added connnect with admin")
				}

			}else{
				// inactive account
				alert("account bloked connnect with admin")
			}
		})
		.catch((error) =>{
			alert("Wrong Password")
			//console.log(error)
			btnlogin.innerHTML = "Log in"
		})
	}
})