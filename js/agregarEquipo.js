function showTournament() {
	var tournament = searchTournament();
	document.getElementById("nameTournament").value = tournament.name;
	document.getElementById("numberTeams").value = tournament.teams;
}
showTournament();

function loadTeams() {
	var teams = JSON.parse(localStorage.getItem('teams'));
	var team;
	var table = document.getElementById("teamsAdded");
	table.innerHTML = "";
	if (localStorage.getItem('teams')) {
		for (var i = 0; i < teams.length; i++) {
			team = teams[i];
			var row = "<tr id=\"" + team.id + "\"><td>" + (i + 1) + "</td><td class=\"name\">" + team.name + "</td></tr>";
			// agregar a la tabla
			table.innerHTML = table.innerHTML + row;
		}
	}
}
loadTeams();

function addEvents() {
	var btnAdd = document.getElementById("addTeam");
	btnAdd.addEventListener("click", addTeams);

	var btnFinished = document.getElementById("finished");
	btnFinished.addEventListener("click", finished);

	var rows = document.querySelectorAll("tr[id]");
	for (var i = 0; i < rows.length; i++) {
		rows[i].addEventListener("click", function(event) {
			selectRow(this);
		}, true);
	}
	var btnEdit = document.getElementById("edit");
	btnEdit.addEventListener("click", editTeam);

	var btnRemove = document.getElementById("remove");
	btnRemove.addEventListener("click", removeTeam);

	document.getElementById("nameTeam").focus();
}
addEvents();

function selectRow(row) {
	if (document.getElementsByClassName("trselected").length > 0) {
		var element = document.getElementsByClassName("trselected");
		element[0].removeAttribute("class");
	}
	row.className = "trselected";
}

function addTeams() {
	var teams = [];
	var positions = [];
	var id = 1;
	if (localStorage.getItem('teams')) {
		teams = JSON.parse(localStorage.getItem('teams'));
		positions = JSON.parse(localStorage.getItem('positions'));
		id = teams[teams.length - 1].id + 1;
	}
	var team = createTeam(id);
	var tournament = searchTournament();
	if (team != 0) {
		if (teams.length < tournament.teams) {
			teams.push(team);
			localStorage.setItem('teams', JSON.stringify(teams));

			var teamPos = {
				idTeam: team.id,
				nameTeam: team.name,
				matchsPlayed: 0,
				goalsFavor: 0,
				goalsAgainst: 0,
				points: 0,
			};
			positions.push(teamPos);
			localStorage.setItem('positions', JSON.stringify(positions));

			// crear una HTML fila
			var row = "<tr id=\"" + team.id + "\"><td>" + (teams.length) + "</td><td class=\"name\">" + team.name + "</td></tr>";
			// agregar a la tabla
			var table = document.getElementById("teamsAdded");
			table.innerHTML = table.innerHTML + row;
			addEvents();
		} else {
			alert("El numero de equipos excede los solicitados en el torneo, favor el eliminar uno antes de ingresar otro!");
			document.getElementById("nameTeam").focus();
		}
		document.getElementById("nameTeam").value = "";
	}
}

function createTeam(Id) {
	var nameteam = document.getElementById("nameTeam").value;
	if (nameteam != "") {
		var team = {
			id: Id,
			name: nameteam,
			idTournament: searchTournament().id,
		};
		return team;
	} else {
		alert("Ingrese el nombre del equipo");
		document.getElementById("nameTeam").focus();
		return 0;
	}
}

function editTeam() {
	if (document.getElementsByClassName("trselected").length != 0) {
		var rowSelected = document.querySelectorAll("tr.trselected > td.name")[0].innerText;
		document.getElementById("nameTeam").value = rowSelected;
		var btnSave = document.getElementById("addTeam");
		btnSave.removeEventListener("click", addTeams);
		btnSave.value = "Guardar";
		document.getElementById("helpText").innerText = "Nuevo nombre del equipo.";
		btnSave.addEventListener("click", saveTeam);
		if (document.getElementById("cancelEdit") == null) {
			var btnCancel = document.createElement("button");
			btnCancel.id = "cancelEdit";
			var text = document.createTextNode("Cancelar");
			btnCancel.appendChild(text);
			btnCancel.addEventListener("click", cancelEditing);
			btnCancel.className = "btn btn-danger";
			document.getElementById("frmCreate").appendChild(btnCancel);
		}
	} else {
		alert("Antes seleccione un equipo!!");
	}
}

function cancelEditing() {
	document.getElementById("nameTeam").value = "";
	document.getElementById("addTeam").value = "Agregar";
	loadTeams();
	document.getElementById("helpText").innerText = "Nombre del equipo que vas agregar";
	addEvents();
	var parent = document.getElementById("frmCreate");
	var child = document.getElementById("cancelEdit");
	parent.removeChild(child);
}

function saveTeam() {
	var newNameTeam = document.getElementById("nameTeam").value;
	if (newNameTeam != "") {
		var oldNameTeam = document.querySelectorAll("tr.trselected > td.name")[0].innerText;
		var teams = JSON.parse(localStorage.getItem('teams'));
		var positions = JSON.parse(localStorage.getItem('positions'));
		var aux;

		for (var i = 0; i < teams.length; i++) {
			aux = teams[i];
			if (aux.name == oldNameTeam) {
				teams[i].name = newNameTeam;
				positions[i].nameTeam = newNameTeam;
				break;
			}
		}
		localStorage.setItem('teams', JSON.stringify(teams));
		localStorage.setItem('positions', JSON.stringify(positions));
		cancelEditing();
		alert("Equipo editado");
		document.getElementById("nameTeam").focus();
	} else {
		alert("Ingrese el nuevo nombre");
	}
}

function removeTeam() {
	if (document.getElementsByClassName("trselected").length != 0) {
		var message = confirm("¿Estás Seguro?");
		if (message) {
			var rowSelected = document.querySelectorAll("tr.trselected > td.name")[0].innerText;
			var teams = JSON.parse(localStorage.getItem('teams'));
			var positions = JSON.parse(localStorage.getItem('positions'));
			for (var i = 0; i < teams.length; i++) {
				if (teams[i].name == rowSelected) {
					if (teams.length != 1) {
						teams.splice(i, 1);
						positions.splice(i, 1);
						localStorage.setItem('teams', JSON.stringify(teams));
						localStorage.setItem('positions', JSON.stringify(positions));
						break;
					} else {
						localStorage.removeItem("teams");
						localStorage.removeItem("positions");
						break;
					}
				}
			}

			alert("Equipo eliminado");
			loadTeams();
			addEvents();
		}
	} else {
		alert("Antes seleccione un equipo!!");
	}
}

function searchTournament() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament = tournaments[tournaments.length - 1];
	return tournament;
}

function createCalendarClasification() {
	var teams = JSON.parse(localStorage.getItem('teams'));
	var tope = teams.length; //modificar el numero de clubes
	var clubes = [];
	for (var i = 0; i < tope; i++) {
		clubes[clubes.length] = (i);
	}
	var auxT = clubes.length;
	var impar = (auxT % 2 != 0);
	if (impar) {
		auxT++;
	}
	var totalP = (auxT * (auxT - 1)) / 2; //total de partidos de una ronda
	var local = [];
	var visita = [];
	var modIF = (auxT / 2); //para hacer mod cada inicio de fecha
	var indiceInverso = auxT - 2;
	for (var i = 0; i < totalP; i++) {
		if (i % modIF == 0) { //seria el partido inicial de cada fecha
			//si es impar el numero de clubes la primera fecha se borra poniendo null
			if (impar) {
				local[i] = null;
				visita[i] = null;
			} else {
				//se pone uno local otro  visita al ultimo equipo
				if (i % 2 == 0) {
					local[i] = clubes[i % (auxT - 1)];
					visita[i] = clubes[auxT - 1];
				} else {
					local[i] = clubes[auxT - 1];
					visita[i] = clubes[i % (auxT - 1)];
				}
			}
		} else {
			local[i] = clubes[i % (auxT - 1)];
			visita[i] = clubes[indiceInverso];
			indiceInverso--;
			if (indiceInverso < 0) {
				indiceInverso = auxT - 2;
			}
		}
	}
	var matchJourney = (totalP / (tope - 1));
	var auxMatchs = (totalP / (tope - 1));
	var matchs = [];
	var journeys;
	var contador = 1;
	var journeysAll = [];
	var idaVuelta = 1;

	do {
		for (var i = 0; i < totalP; i++) {
			var aux = i;
			if (i < matchJourney) {
				var teamLocal = "";
				var teamVisit = "";
				if (idaVuelta == 1) {
					teamLocal = searchTeam(local[i]).name;
					teamVisit = searchTeam(visita[i]).name;
				} else {
					teamLocal = searchTeam(visita[i]).name;
					teamVisit = searchTeam(local[i]).name;
				}
				var match = {
					local: teamLocal,
					visit: teamVisit,
				};
				matchs[matchs.length] = match;
			} else {
				journeys = {
					matchs: matchs,
					number: contador,
				};
				journeysAll[journeysAll.length] = journeys;
				journeys = null;
				contador++;
				matchs = [];
				matchJourney = matchJourney + auxMatchs;
				i = aux - 1;
			}
		}
		journeys = {
			matchs: matchs,
			number: contador,
		};
		journeysAll[journeysAll.length] = journeys;
		idaVuelta++;
		matchs = [];
		matchJourney = (totalP / (tope - 1));
		contador++;
	} while (idaVuelta < 3);
	localStorage.setItem("calendar", JSON.stringify(journeysAll));
}

function searchTeam(position) {
	var teams = JSON.parse(localStorage.getItem('teams'));
	for (var i = 0; i < teams.length; i++) {
		if (i == position) {
			return teams[i];
		}
	}
}

function finished() {
	var tournament = searchTournament();
	var tournamentNumberTeams = tournament.teams;

	var teams = JSON.parse(localStorage.getItem('teams'));
	if (teams != null) {
		teams = JSON.parse(localStorage.getItem('teams')).length;
		if (tournamentNumberTeams == teams) {
			location.href = "Principal.html";
			if (tournament.mode == "MC") {
				createCalendarClasification();
			} else {

			}
		} else if (tournamentNumberTeams < teams) {
			console.log(tournamentNumberTeams + "\n" + teams);
			alert("Hay más equipos de los que solicita el torneo");
		} else if (tournamentNumberTeams > teams) {
			alert("Hay menos equipos de los que solicita el torneo");
		}
	} else {
		alert("No hay equipos");
	}
}