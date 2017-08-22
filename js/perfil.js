var user;

function addEvents(){
	var btn = document.getElementById("save");
	btn.addEventListener("click", saveInfo);
}
addEvents();
function loadInfo(){
	var auxUser = localStorage.getItem("userActive");
	var users = JSON.parse(localStorage.getItem("users"));
	for (var i = 0; i < users.length; i++) {
		if (users[i].userName == auxUser) {
			user = users[i];
			break;
		}
	}
	document.getElementById("user").value = user.userName;
	document.getElementById("email").value = user.email;
	document.getElementById("name").value = user.name;
	document.getElementById("lastname").value = user.lastname;
	document.getElementById("phone").value = user.phone;
	document.getElementById("info").value = user.info;
}
loadInfo();

function saveInfo () {
	user.name = document.getElementById("name").value ;
	user.lastname = document.getElementById("lastname").value;
	user.phone = document.getElementById("phone").value;
	user.info = document.getElementById("info").value;
	var users = JSON.parse(localStorage.getItem("users"));
	for (var i = 0; i < users.length; i++) {
		if (users[i].userName == user.userName) {
			users[i] = user
			break;
		}
	}
	localStorage.setItem("users", JSON.stringify(users));
	alert("Guardado");
}