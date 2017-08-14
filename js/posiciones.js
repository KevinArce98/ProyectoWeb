function showTeams() {
	var positions = JSON.parse(localStorage.getItem('positions'));
	var team;
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
		table.innerHTML = table.innerHTML + row;
	}
}
showTeams();