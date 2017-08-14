function addEvents() {
	var button = document.getElementById("sendInfo");
	button.addEventListener("click", createUser);
}
addEvents();

function signup(User) {
	var users = JSON.parse(localStorage.getItem('users'));
	if ((User.email != "") && (User.userName != "") && (User.pass != "")) {
		if (users == null) {
			if (User.pass != User.passOther) {
				alert("Contraseñas distintas.");
			} else {
				saveUser(User);
				clearFileds();
				alert("Registrado");
			}
		} else {
			var element;
			for (var i = 0; i < users.length; i++) {
				element = users[i];
				if (element.email == User.email) {
					alert("El correo " + User.email + " ya ha sido registrado anteriormente.");
					document.getElementById("email").focus();
					break;
				} else if (element.userName == User.userName) {
					alert("El nombre de usuario " + User.userName + " ya ha sido registrado anteriormente.");
					document.getElementById("user").focus();
					break;
				} else if (User.pass != User.passOther) {
					document.getElementById("pass").focus();
					alert("Contraseñas distintas.");
					break;
				} else {
					saveUser(User);
					clearFileds();
					alert("Registrado");
					break;
				}
			}
		}
	}else {
		alert("Ingrese todos los datos");
	}
}

function saveUser(User) {
	var users = [];
	if (localStorage.getItem('users')) {
		users = JSON.parse(localStorage.getItem('users'));
	}
	users.push(User);
	localStorage.setItem('users', JSON.stringify(users));
}

function createUser() {
	var User = {
		email: document.getElementById("email").value,
		userName: document.getElementById("user").value,
		pass: document.getElementById("pass").value,
		passOther: document.getElementById("passOther").value,
	};
	signup(User);
}

function clearFileds() {
	document.getElementById("email").value = "";
	document.getElementById("user").value = "";
	document.getElementById("pass").value = "";
	document.getElementById("passOther").value = "";
}