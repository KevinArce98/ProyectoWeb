function showTeams() {
	var positions = searchPositionsValid();

	var team;
	positions.sort(function(a,b) {return (b.points - a.points);});
	for (var i = 0; i < positions.length; i++) {
		team = positions[i];
		var row = "<tr><td>" + (i + 1) +
			"</td><td>" + team.nameTeam +
			"</td><td>" + team.matchsPlayed +
			"</td><td>" + team.goalsFavor +
			"</td><td>" + team.goalsAgainst +
			"</td><td>" + team.points + "</td></tr>";
		// agregar a la tabla
		var table = document.getElementById("positionsTeams");
		table.innerHTML =  table.innerHTML + row;
	}
}
showTeams();

function addEvents(){
	var btn = document.getElementById("order");
	btn.addEventListener("click", orderTable);
}
addEvents();

function orderTable(){
	var options = document.getElementById("select").options;
	var selection = options[options.selectedIndex].value;
	var positions = searchPositionsValid();

	if (selection == "al") {
		positions.sort(function(a,b) {return (a.nameTeam > b.nameTeam) ? 1 : ((b.nameTeam > a.nameTeam) ? -1 : 0);} );
	}else if (selection == "pu") {
		positions.sort(function(a,b) {return (b.points - a.points);}); 
	}else if (selection == "gol") {
		positions.sort(function(a,b) {return (b.goalsFavor - a.goalsFavor);}); 
	}else if (selection == "pa") {
		positions.sort(function(a,b) {return (b.matchsPlayed - a.matchsPlayed);});
	}
	showTeamsOrder(positions);	
}

function showTeamsOrder(positions){
	var team;
	document.getElementById("positionsTeams").innerHTML = null;
	for (var i = 0; i < positions.length; i++) {
		team = positions[i];
		var row = "<tr><td>" + (i + 1) +
			"</td><td>" + team.nameTeam +
			"</td><td>" + team.matchsPlayed +
			"</td><td>" + team.goalsFavor +
			"</td><td>" + team.goalsAgainst +
			"</td><td>" + team.points + "</td></tr>";
		// agregar a la tabla
		var table = document.getElementById("positionsTeams");
		table.innerHTML =  table.innerHTML + row;
	}
}

function searchTournament() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	for (var i = tournaments.length-1; i >= 0; i--) {
		if (tournaments[i].name == localStorage.getItem("active")) {
			tournament = tournaments[i];
			break;
		}
	}
	return tournament;
}

function searchPositionsValid() {
	var teamsAll = JSON.parse(localStorage.getItem('teams'));
	var teams = [];
	for (var i = 0; i < teamsAll.length; i++) {
		if (teamsAll[i].idTournament == searchTournament().id) {
			teams.push(teamsAll[i]);
		}
	}
	var positionsAll = JSON.parse(localStorage.getItem('positions'));
	var positions = [];

	for (var i = 0; i < teams.length; i++) {
		for (var j = 0; j < positionsAll.length; j++) {
			if (positionsAll[j].idTeam == teams[i].id) {
				positions.push(positionsAll[j]);
			}
		}
	}
	return positions;
}