function changeJumbotron() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var count = 0;
	var parent;
	var child;
	var thereWas = false;
	if (tournaments != null) {
		for (var i = 0; i < tournaments.length; i++) {
			if (tournaments[i].userName == localStorage.getItem("userActive")) {
				if (count == 0) {
					parent = document.getElementById("jumbotron");
					child = document.getElementById("notFind");
					parent.removeChild(child);
					count++;
				}
				createElements(tournaments[i].name);
				var tournament = document.getElementById(tournaments[i].name);
				tournament.textContent = tournaments[i].name;
				parent.className = "jumbotron";
				thereWas = true;
			}
		}
	}
	if (thereWas == true) {
		document.getElementById("otro").style.display = 'block';
		document.getElementById("text").style.display = 'block';
	}else {
		document.getElementById("otro").style.display = 'none';
		document.getElementById("text").style.display = 'none';
	}
}
changeJumbotron();

function addEvents(){
	if (document.getElementById("notFind") == undefined) {
		var btnsTournament = document.getElementsByName("torneo");
		for (var i = 0; i < btnsTournament.length; i++) {
			btnsTournament[i].addEventListener("click", function click (event) {
				setActive(this);
			}, true);
		}
		var btnOther = document.getElementById("otro");
		btnOther.addEventListener("click", function () {
			location.href = "CrearCampeonato.html";
		});
	}
	if (localStorage.getItem("active")) {
		var btn = document.getElementById(localStorage.getItem("active"));
		btn.className = "btn btn-lg col-xs-12 btnSelected";
	}

}
addEvents();


function setActive(btnSelected){
	var tournament = btnSelected;
	enableLi(tournament.innerText);
	localStorage.setItem("active", tournament.innerText);
	btnSelected.removeEventListener("click", function click (event) {
				setActive(this);
			}, true);
	var btn = document.getElementsByClassName("btn btn-lg col-xs-12 btnSelected");
	if (btn.length != 0) {
		btn[0].className = "btn btn-lg btn-warning col-xs-12";
	}
	btnSelected.className = "btn btn-lg col-xs-12 btnSelected";
}

function createElements(tournamentName) {
	var button = "<div class=\"row\">"+"<button type=\"button\" " +
		"class=\"btn btn-lg btn-warning col-xs-12\" id=\""+ tournamentName +"\" name=\"torneo\"></button>"+"</div>";
	var div = document.getElementById("jumbotron");
	div.innerHTML =  div.innerHTML + button;
}

function enableLi(tournamentName) {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	for (var i = 0; i < tournaments.length; i++) {
		if (tournaments[i].name == tournamentName) {
			tournament = tournaments[i];
			break;
		}
	}
	if (tournament.mode == "ME") {
		var li = document.getElementsByClassName("available");
		for (var i = 0; i < li.length; i++) {
			var aux = li[i].getElementsByTagName("a")[0].innerText;
			if (aux != "Tabla Posiciones") {
				li[i].style.display = "block";
			}else {
				li[i].style.display = "none";
			}
		}
	} else {
		var li = document.getElementsByClassName("available");
		for (var i = 0; i < li.length; i++) {
			var aux = li[i].getElementsByTagName("a")[0].innerText;
			if (aux != "Llaves") {
				li[i].style.display = "block";
			}else {
				li[i].style.display = "none";
			}
		}
	}
}

