function showTeams() {
	var positions = JSON.parse(localStorage.getItem('positions'));
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
	var positions = JSON.parse(localStorage.getItem('positions'));

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