
const courseappling = localStorage.getItem('bookfor');
document.getElementById('mybook').innerHTML = courseappling;
btnsubmitbook = document.getElementById('btnsubmitbook');

//insertcount() ;
function insertapplication() {
  // body...

	// get application date
      var newdate = new Date();
  	var day = newdate.getDate();
   var month = newdate.getMonth();
    var year = newdate.getFullYear();
     var enrolldate = day + "-" + month + "-" + year;
     // get learning mode and all form details
     let applicantemail = document.getElementById('name').value;
     let enrollcourse = courseappling;
     let studentname = document.getElementById('name').value;
     let othername = document.getElementById('name').value;
     let phonenumber = document.getElementById('name').value;
     let locationname = document.getElementById('name').value;
     let learningmode = document.getElementById('name').value;


    
  firebase.database().ref('Application/' + applicantemail).set({

  Email: applicantemail,
  StudentName: studentname,
  OtherName: othername,
  PhoneNumber: phonenumber,
  CourseName: enrollcourse,
  LocationName: locationname,
  LearningMode : learningmode,
  EnrollDate : enrolldate

    },  (error) => {
  if (error) {
    // The write failed...
     alert('Application Faled');
     
  }else{
 alert('Application Succefull will be conducted soon thank you');
     
  }
}
)
}

btnsubmitbook.addEventListener('click' , ()  => {
	insertapplication()
})