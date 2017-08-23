var inputOld =  document.getElementById("numTeams");

function addEvents() {
	var button = document.getElementById("create");
	button.addEventListener("click", saveChampionship);
	var txtTeams = document.getElementById("numTeams");
	txtTeams.addEventListener("change", function(event) {
		verificationTeams(event);
	}, true);
	var btnCancel = document.getElementById("cancel");
	btnCancel.addEventListener("click", function(){
		location.href = "Principal.html";
	}, true);
}
addEvents();

function createChampionship(Id) {
	var tournament = {
		id: Id,
		userName : localStorage.getItem("userActive"),
		name: document.getElementById("name").value,
		modality: document.querySelector('input[name="modalidad"]:checked').value,
		mode: document.querySelector('input[name="modo"]:checked').value,
		teams: document.getElementById("numTeams").value,
		pointsWin: document.getElementById("win").value,
		pointsTie: document.getElementById("tie").value,
		pointsLose: document.getElementById("lose").value,
	};
	return tournament;
}

function saveChampionship() {
	var tournaments = [];
	var id = 1;
	if (localStorage.getItem('tournaments')) {
		tournaments = JSON.parse(localStorage.getItem('tournaments'));
		id = tournaments[tournaments.length - 1].id + 1;
	}
	if (verfication() == true) {
		var Tournament = createChampionship(id);
		tournaments.push(Tournament);
		localStorage.setItem('tournaments', JSON.stringify(tournaments));
		location.href = "AgregarEquipos.html";
	} else {
		alert("Ingrese todos los datos solicitados");
	}
}

function verificationTeams(event) {
	var data = parseInt(event.target.value);
	
	if (document.querySelector('input[name="modo"]:checked') != null) {
		var mode = document.querySelector('input[name="modo"]:checked').value;
		if ( mode == "MC") {
			if (data >= 2) {
				if (data <= 32) {
					if ((data % 2) != 0) {
						alert("Los equipos tienen que ser pares");
						document.getElementById("numTeams").value = "2";
					}
				} else {
					alert("el maximo de equipos es 32");
					document.getElementById("numTeams").value = "32";
				}
			} else {
				alert("el minimo de equipos es 2");
				document.getElementById("numTeams").value = "2";
			}
		}else if(mode == "ME"){
			if (data >= 2) {
				if (data <= 32) {
					if ((data != 2) && (data != 4 ) && (data != 8 ) && (data != 16) && (data != 32)) {
						alert("el numero de equipos tiene que ser 2-4-8-16-32 para eliminatoria");
						document.getElementById("numTeams").value = "2";
					}
				} else {
					alert("el maximo de equipos es 32");
					document.getElementById("numTeams").value = "32";
				}
			} else {
				alert("el minimo de equipos es 2");
				document.getElementById("numTeams").value = "2";
			}
		}
	}else {
			alert("Selecione el modo antes");
			document.getElementById("numTeams").value = "";
		}
}


function verfication() {
	var name = document.getElementById("name").value;
	var modality = document.querySelector('input[name="modalidad"]:checked');
	var mode = document.querySelector('input[name="modo"]:checked');
	var teams = document.getElementById("numTeams").value;
	var pointsWin = document.getElementById("win").value;
	var pointsTie = document.getElementById("tie").value;
	var pointsLose = document.getElementById("lose").value;

	if ((name != "") && (modality != null) && (mode != null) && (teams != "") && (pointsWin != "") && (pointsTie != "") && (pointsLose != "")) {
		return true;
	} else {
		return false;
	}
}