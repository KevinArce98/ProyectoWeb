var goalScorerVisit = [];
var goalScorerLocal = [];
var linkA;
var div;

function showMatchs() {
	var nameTournament = localStorage.getItem("active")
	var journeysAll = JSON.parse(localStorage.getItem('calendar ' + nameTournament));
	var team1;
	var team2;
	var createMatch;
	var list = "";
	var contain = document.getElementById('contain');
	contain.innerHTML = null;
	for (var i = 0; i < journeysAll.length; i++) {
		var matchs = journeysAll[i].matchs;
		var journey = "Jornada " + journeysAll[i].number;
		list = "";
		for (var j = 0; j < matchs.length; j++) {
			team1 = matchs[j].local;
			team2 = matchs[j].visit;
			if (matchs[j].finished == false) {
				createMatch = "<a href=\"#ventanaAgregar\" data-toggle=\"modal\" name=\"setScore\">" +
					"<div class=\"col-md-2 hover\">" +
					"<input value=\"" + team1 + "\" class=\"form-control text-center\" readonly name=\"local\">" +
					"<p class=\"vs\">VS</p>" +
					"<input value=\"" + team2 + "\" class=\"form-control text-center\" readonly name=\"visit\">" +
					"</div>" +
					"</a>";
			} else {
				createMatch = "<a data-toggle=\"modal\">" +
					"<div class=\"col-md-2 matchFinished\">" +
					"<input value=\"" + team1 + "\" class=\"form-control text-center\" readonly name=\"local\">" +
					"<p class=\"vs\">VS</p>" +
					"<input value=\"" + team2 + "\" class=\"form-control text-center\" readonly name=\"visit\">" +
					"</div>" +
					"</a>";
			}
			list += createMatch;
		}
		var createJourney = "<h2 class=\"text-center\">" + journey + "</h2>" +
			"<div class=\"ronda row\" name=\"round\">" +
			"<div class=\"col-xs-12 col-sm-12 col-md-12\">" +
			list +
			"</div>" +
			"</div>";
		contain = document.getElementById('contain');
		contain.innerHTML = contain.innerHTML + createJourney;
	}
}
showMatchs();

function addEvents() {
	var a = document.getElementsByName("setScore");
	for (var i = 0; i < a.length; i++) {
		a[i].addEventListener("click", function(event) {
			setScore(this);
		}, true);
	}
	var btnAddLocal = document.getElementById("addLocal");
	btnAddLocal.addEventListener("click", addGoalLocal);

	var btnAddVisit = document.getElementById("addVisit");
	btnAddVisit.addEventListener("click", addGoalVisit);

	var btnSaveResult = document.getElementById("saveResult");
	btnSaveResult.addEventListener("click", finished);

	var btnCancel = document.getElementById("cancel");
	btnCancel.addEventListener("click", cancel);

	var btnClose = document.getElementsByClassName("close")[0];
	btnClose.addEventListener("click", cancel)
}
addEvents();

function setScore(a) {
	a.id = "this";
	var team1 = a.querySelector("input[name='local']").value;
	var team2 = a.querySelector("input[name='visit']").value;
	document.getElementById("teamLocal").value = team1;
	document.getElementById("teamVisit").value = team2;
	linkA = a;
	div = a.getElementsByClassName("hover")[0];
}

function addGoalLocal() {
	var goalScorer = document.getElementById("nameScorer1").value;
	if (goalScorer != "") {
		var area = document.getElementById("scoresLocal");
		area.value = area.value + goalScorer + "\n";
		goalScorerLocal.push(goalScorer);
		document.getElementById("nameScorer1").value = "";
		var goals = document.getElementById("goalLocal");
		goals.value = parseInt(goals.value) + 1;
	} else {
		alert("Ingrese el nombre");
	}
}

function addGoalVisit() {
	var goalScorer = document.getElementById("nameScorer2").value;
	if (goalScorer != "") {
		var area = document.getElementById("scoresVisit");
		area.value = area.value + goalScorer + "\n";
		goalScorerVisit.push(goalScorer);
		document.getElementById("nameScorer2").value = "";
		var goals = document.getElementById("goalVisit");
		goals.value = parseInt(goals.value) + 1;
	} else {
		alert("Ingrese el nombre");
	}
}

function finished() {
	if (searchTournament().mode == "MC") {
		setScoresPositions();
	}
	setFinishedMatch(document.getElementById("teamLocal").value, document.getElementById("teamVisit").value, searchTournament().mode);
	$('#ventanaAgregar').modal('hide');
	linkA.removeEventListener("click", function(event) {
		setScore(this);
	}, true);
	linkA.removeAttribute('href');
	div.className = "col-md-2 matchFinished";
	if (searchTournament().mode == "ME") {
		addCalendarElimination();
	}
	showMatchs();
	addEvents();
}

function setFinishedMatch(local, visit, mode) {
	var nameTournament = localStorage.getItem("active");
	var journeysAll = JSON.parse(localStorage.getItem('calendar ' + nameTournament));
	var team1;
	var team2;
	for (var i = 0; i < journeysAll.length; i++) {
		var matchs = journeysAll[i].matchs;
		for (var j = 0; j < matchs.length; j++) {
			team1 = matchs[j].local;
			team2 = matchs[j].visit;
			if ((team1 == local) && (team2 == visit)) {
				matchs[j].finished = true;
				if (mode == "ME") {
					matchs[j].goalLocal = document.getElementById("goalLocal").value;
					matchs[j].goalVisit = document.getElementById("goalVisit").value;
				}
				break;
			}
		}
	}
	localStorage.setItem("calendar " + nameTournament, JSON.stringify(journeysAll));
}

function setScoresPositions() {
	var teams = searchTeamsValid();
	var team1;
	var team2;
	for (var i = 0; i < teams.length; i++) {
		if (teams[i].name == document.getElementById("teamLocal").value) {
			team1 = teams[i];
		} else if (teams[i].name == document.getElementById("teamVisit").value) {
			team2 = teams[i];
		}
	}
	var positions = JSON.parse(localStorage.getItem("positions"));
	for (var i = 0; i < positions.length; i++) {
		if (positions[i].idTeam == team1.id) {
			positions[i] = winAndLose(positions[i], true);
		} else if (positions[i].idTeam == team2.id) {
			positions[i] = winAndLose(positions[i], false);
		}
	}
	localStorage.setItem('positions', JSON.stringify(positions));
}

function winAndLose(team, local) {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	var nameTournament = localStorage.getItem("active");
	for (var i = 0; i < tournaments.length; i++) {
		if (tournaments[i].name == nameTournament) {
			tournament = tournaments[i];
			break;
		}
	}
	var pointsWin = parseInt(tournament.pointsWin);
	var pointsTie = parseInt(tournament.pointsTie);
	var pointsLose = parseInt(tournament.pointsLose);
	var goalsLocal = parseInt(document.getElementById("goalLocal").value);
	var goalsVisit = parseInt(document.getElementById("goalVisit").value);

	if (goalsLocal > goalsVisit) {
		if (local == true) {
			team.goalsFavor += goalsLocal;
			team.goalsAgainst += goalsVisit;
			team.points += pointsWin;
		} else {
			team.goalsFavor += goalsVisit;
			team.goalsAgainst += goalsLocal;
			team.points += pointsLose;
		}
	} else if (goalsLocal < goalsVisit) {
		if (local == true) {
			team.goalsFavor += goalsVisit;
			team.goalsAgainst += goalsLocal;
			team.points += pointsLose;
		} else {
			team.goalsFavor += goalsLocal;
			team.goalsAgainst += goalsVisit;
			team.points += pointsWin;
		}
	} else if (goalsLocal == goalsVisit) {
		team.goalsFavor += goalsLocal;
		team.goalsAgainst += goalsVisit;
		team.points += pointsTie;
	}
	team.matchsPlayed += 1;
	return team;
}

function searchTeamsValid() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	var nameTournament = localStorage.getItem("active");
	for (var i = 0; i < tournaments.length; i++) {
		if (tournaments[i].name == nameTournament) {
			tournament = tournaments[i];
			break;
		}
	}
	var teamsAll = JSON.parse(localStorage.getItem('teams'));
	var teams = [];
	for (var i = 0; i < teamsAll.length; i++) {
		if (teamsAll[i].idTournament == tournament.id) {
			teams.push(teamsAll[i]);
		}
	}
	return teams;
}

function searchTournament() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	for (var i = tournaments.length - 1; i >= 0; i--) {
		if ((tournaments[i].userName == localStorage.getItem("userActive")) && tournaments[i].name == localStorage.getItem("active")) {
			tournament = tournaments[i];
			break;
		}
	}
	return tournament;
}

function cancel() {
	document.getElementById("nameScorer2").value = "";
	document.getElementById("scoresVisit").value = "";
	document.getElementById("goalVisit").value = "0";

	document.getElementById("nameScorer1").value = "";
	document.getElementById("scoresLocal").value = "";
	document.getElementById("goalLocal").value = "0";

}
function addCalendarElimination(){
	var nameTournament = localStorage.getItem("active");
	var journeysAll = JSON.parse(localStorage.getItem('calendar ' + nameTournament));
	var anyoneFinished = false;
	var whatRound;
	if (searchTeamsValid().length > 2) {
		
		for (var i = 0; i < journeysAll.length; i++) {
			var journeyMatchs = journeysAll[i].matchs;
			for (var k = 0; k < journeyMatchs.length; k++) {
				if (journeyMatchs.finished == false) {
					anyoneFinished = false;
					whatRound = i;
					break;
				}else{
					whatRound = i;
					anyoneFinished = true;
				}
			}
			if (anyoneFinished == false) {
				break;
			}
		}
		var matchs = [];
		var matchsList = journeysAll[0].matchs;
		anyoneFinished = false;
		for (var j = 0; j < matchsList.length; j = j+2) {
			if (matchsList[j].finished == true && matchsList[j+1].finished == true) {
				var team1;
				var team2;
				if (parseInt(matchsList[j].goalLocal) < parseInt(matchsList[j].goalVisit)) {
					team1 = matchsList[j].visit;
				}else if (parseInt(matchsList[j].goalVisit) < parseInt(matchsList[j].goalLocal)) {
					team1 = matchsList[j].local;
				}
				if (parseInt(matchsList[j+1].goalLocal) < parseInt(matchsList[j+1].goalVisit)) {
					team2 = matchsList[j+1].visit;
				}else if (parseInt(matchsList[j+1].goalVisit) < parseInt(matchsList[j+1].goalLocal)) {
					team2 = matchsList[j+1].local;
				}
				var match = {
					local: team1,
					visit: team2,
					goalLocal: "",
					goalVisit: "",
					finished : false,
				};
				anyoneFinished = true;
				matchs[matchs.length] = match;
			}
		}
		if (anyoneFinished == true) {
			var journeys = {
				matchs: matchs,
				number: journeysAll.length +1
			};
			journeysAll[journeysAll.length] = journeys;

			localStorage.setItem("calendar " + nameTournament, JSON.stringify(journeysAll));
		}
	}
}