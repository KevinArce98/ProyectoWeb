function showMatchs() {
	var journeysAll = JSON.parse(localStorage.getItem('calendar'));
	var team1;
	var team2;
	var createMatch;
	var list = "";
	for (var i = 0; i < journeysAll.length; i++) {
		var matchs = journeysAll[i].matchs;
		var journey = "Jornada " + journeysAll[i].number;
		list = "";
		for (var j = 0; j < matchs.length; j++) {
			team1 = matchs[j].local;
			team2 = matchs[j].visit;
			createMatch = "<div class=\"col-md-2\">"+
			"<input value=\"" + team1 + "\" class=\"form-control text-center\" readonly>" +
			"<p class=\"vs\">VS</p>" +
			"<input value=\"" + team2 + "\" class=\"form-control text-center\" readonly>" +
			"</div>";
			list += createMatch;
		}
		var createJourney = "<h2 class=\"text-center\">" + journey + "</h2>" + 
		"<div class=\"ronda row\" name=\"round\">" +
		"<div class=\"col-xs-12 col-sm-12 col-md-12\">" +
			list+
		"</div>" +
		"</div>";
		var contain = document.getElementById('contain');
		contain.innerHTML = contain.innerHTML + createJourney;
	}
}
showMatchs();