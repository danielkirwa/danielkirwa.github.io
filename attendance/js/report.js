
let totalAdmins = 0
let totalStudents = 0
firebase.database().ref("userDetails").once("value", function(snapshot) {

	snapshot.forEach(function(childSnapshot){
		let data = childSnapshot.val()
		if (data.Role == "Admin"){
			totalAdmins++
			
		}else{
			totalStudents++
			
		}

	})
	 // display total count
	drawbargraph()

})


function drawbargraph(){
  const canvasforbargraph = document.getElementById('mybargraph')
  new Chart(canvasforbargraph, {
  	type : 'bar',
  	data:{
  		labels : ['Admins', 'Students'],
  		datasets :[{
  			label : "System users",
  			data: [totalAdmins, totalStudents],
  			borderWidth:1
  		}]
  	},
  	options:{
  		responsive: true,
  		scale:{
  			y:{
  				beginAtZero:true
  			}
  		}
  	}
  })
}


// courses pie
let totalactivecourses = 0
let totalinactivecourses = 0
firebase.database().ref("Courses").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active"){
      totalactivecourses++
    }else{
    	totalinactivecourses++
    }

  })
  // show data 
  coursespie()
})

function coursespie() {
	const canvasforcourses = document.getElementById('mypiecourses')
	new Chart(canvasforcourses, {
		type:'pie',
		data:{
			labels:["Active", "Inactive"],
			datasets:[{
				data:[totalactivecourses, totalinactivecourses]
			}]
		}
	})
}

// show admin pie chart
let totalactiveadmin = 0
let totalinactivedamin = 0
firebase.database().ref("userDetails").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active" && data.Role == "Admin"){
      totalactiveadmin++
    }else if(data.Status == "inactive" && data.Role == "Admin"){
    	totalinactivedamin++
    }
    })
  drawpieadmin()
})


function drawpieadmin(){
  const canvasforpieadmin = document.getElementById('mypieadmin')
  new Chart(canvasforpieadmin, {
  	type : 'doughnut',
  	data:{
  		labels : ['Active', 'Inactive'],
  		datasets :[{
  			label : "System admins",
  			data: [totalactiveadmin, totalinactivedamin],
  			borderWidth:1
  		}]
  	},
  	options:{
  		responsive: true,
  		scale:{
  			y:{
  				beginAtZero:true
  			}
  		}
  	}
  })
}


// gps 
let totalGPSactive = 0
let totalGPSinactive = 0
firebase.database().ref("GpsVenus").once("value", function(snapshot) {
  let total = 0
  snapshot.forEach(function(childSnapshot){
    let data = childSnapshot.val()
    if (data.Status == "active"){
      totalGPSactive++
    }else{
    	totalGPSinactive++
    }

  })

  drawpiegps()
  
})

function drawpiegps(){
  const canvasforpiegps = document.getElementById('mypiegps')
  new Chart(canvasforpiegps, {
  	type : 'bar',
  	data:{
  		labels : ['Active', 'Inactive'],
  		datasets :[{
  			label : "GPS venues",
  			data: [totalGPSactive, totalGPSinactive],
  			borderWidth:1
  		}]
  	},
  	options:{
  		responsive: true,
  		scale:{
  			y:{
  				beginAtZero:true
  			}
  		}
  	}
  })
}