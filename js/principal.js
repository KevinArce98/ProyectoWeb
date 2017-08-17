function disabledLi() {
	var li = document.getElementsByClassName("available");
	for (var i = 0; i < li.length; i++) {
		li[i].style.display = "none";
	}
}

function changeJumbotron() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	if (tournaments != null) {
		var parent = document.getElementById("jumbotron");
		var child = document.getElementById("notFind");
		parent.removeChild(child);

		createElements();
		var tournament = document.getElementById("torneo");
		tournament.textContent = tournaments[0].name;
		parent.className = "jumbotron";
		var tournamentName = localStorage.getItem("active");
		document.getElementById("text").style.display = 'block';
		if (tournamentName != null) {
			setActive();
		}else {
			disabledLi();	
		}
	}else {
		document.getElementById("text").style.display = 'none';
		disabledLi();
	}
}
changeJumbotron();

function addEvents(){
	if (document.getElementById("notFind") == undefined) {
		var btnTournament = document.getElementById("torneo");
		btnTournament.addEventListener("click", setActive);
	}
}
addEvents();

function setActive(){
	var tournament = document.getElementById("torneo");
	enableLi(tournament.innerText);
	localStorage.setItem("active", tournament.innerText);
	var btn = document.getElementById("torneo");
	btn.style.backgroundColor = '#2a4f6f';
	btn.style.cursor = 'default';
	btn.removeEventListener("click", setActive)
}

function createElements() {
	var button = "<div class=\"row\">"+"<button type=\"button\" " +
		"class=\"btn btn-lg btn-primary col-xs-12\" id=\"torneo\"></button>"+"</div>";
	var div = document.getElementById("jumbotron");
	div.innerHTML = button;
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

