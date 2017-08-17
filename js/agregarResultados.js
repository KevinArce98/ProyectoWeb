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
			createMatch = "<a href=\"#ventanaAgregar\" data-toggle=\"modal\" name=\"setScore\">" +
				"<div class=\"col-md-2 hover\">" +
				"<input value=\"" + team1 + "\" class=\"form-control text-center\" readonly name=\"local\">" +
				"<p class=\"vs\">VS</p>" +
				"<input value=\"" + team2 + "\" class=\"form-control text-center\" readonly name=\"visit\">" +
				"</div>" +
				"</a>";
			list += createMatch;
		}
		var createJourney = "<h2 class=\"text-center\">" + journey + "</h2>" +
			"<div class=\"ronda row\" name=\"round\">" +
			"<div class=\"col-xs-12 col-sm-12 col-md-12\">" +
			list +
			"</div>" +
			"</div>";
		var contain = document.getElementById('contain');
		contain.innerHTML = contain.innerHTML + createJourney;
	}
}
showMatchs();
function addEvents(){
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
function setScore(a){
	a.id = "this";
	var team1 = a.querySelector("input[name='local']").value;
	var team2 = a.querySelector("input[name='visit']").value;
	document.getElementById("teamLocal").value = team1;
	document.getElementById("teamVisit").value = team2;
}
function addGoalLocal(){
	var goalScorer = document.getElementById("nameScorer1").value;
	if (goalScorer != "") {
		var area = document.getElementById("scoresLocal");
		area.value = area.value + goalScorer + "\n";
		document.getElementById("nameScorer1").value = "";
		var goals = document.getElementById("goalLocal");
		goals.value = parseInt(goals.value) + 1;
	}else{
		alert("Ingrese el nombre");
	}
}

function addGoalVisit(){
	var goalScorer = document.getElementById("nameScorer2").value;
	if (goalScorer != "") {
		var area = document.getElementById("scoresVisit");
		area.value = area.value + goalScorer + "\n";
		document.getElementById("nameScorer2").value = "";
		var goals = document.getElementById("goalVisit");
		goals.value = parseInt(goals.value) + 1;
	}else{
		alert("Ingrese el nombre");
	}
}

function finished(){
	var goalLocal = document.getElementById("goalLocal").value;
	var goalVisit = document.getElementById("goalVisit").value;
	var goalScorerLocal = document.getElementById("scoresLocal").value;
	var goalScorerVisit = document.getElementById("scoresVisit").value;
	
	console.log(goalScorerLocal);
}

function cancel(){
	document.getElementById("nameScorer2").value = "";
	document.getElementById("scoresVisit").value = "";
	document.getElementById("goalVisit").value = "0";

	document.getElementById("nameScorer1").value = "";
	document.getElementById("scoresLocal").value = "";
	document.getElementById("goalLocal").value = "0";

}

