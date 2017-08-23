var positionTournament;

function addEvents () {
	var btn = document.getElementById("order");
	btn.addEventListener("click", orderTable); 

	var btnDelete = document.getElementById("remove");
	btnDelete.addEventListener("click", removeTable);
}
addEvents();

function loadGoalScorer(){
	var table = document.getElementById("goalScorer");
		table.innerHTML = null;
	if (localStorage.getItem("goalScorers")) {
		
		var list = searchGoalScorerValid();
		list.sort(function(a,b) {return (b.goal - a.goal);});
		for (var k = 0; k < list.length; k++) {
			var row = "<tr><td>" + (k + 1) +
				"</td><td>" + list[k].name +
				"</td><td>" + list[k].goal +
				"</td><td>" + list[k].team +
				"</td></tr>";
			// agregar a la tabla
			var table = document.getElementById("goalScorer");
			table.innerHTML =  table.innerHTML + row;
		}
	}	
}
loadGoalScorer();

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

function searchGoalScorerValid () {
	var list = [];
	if (localStorage.getItem("goalScorers")) {
		var goalScorersAll = JSON.parse(localStorage.getItem("goalScorers"));
		for (var i = 0; i < goalScorersAll.length; i++) {
			if (goalScorersAll[i].idTournament == searchTournament().id) {
			 	list = goalScorersAll[i].scorers;
			 	positionTournament = i;
			 	break;
			}else {
				list = null;
			}
		}
	}
	return list;		
}
function removeTable () {
	if (localStorage.getItem("goalScorers")) {
		var goalScorersAll = JSON.parse(localStorage.getItem("goalScorers"));
		
		if (searchGoalScorerValid() != null) {
			if (goalScorersAll.length != 1) {
				goalScorersAll.splice(positionTournament, 1);
				localStorage.setItem("goalScorers", JSON.stringify(goalScorersAll));
			}else {
				localStorage.removeItem("goalScorers");
			}
		}
	}
	loadGoalScorer();
}

function orderTable(){
	var options = document.getElementById("select").options;
	var selection = options[options.selectedIndex].value;
	var goalScorers = searchGoalScorerValid();

	if (selection == "alfabeto") {
		goalScorers.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);});
	}else if (selection == "equipo") {
		goalScorers.sort(function(a,b) {return (a.team > b.team) ? 1 : ((b.team > a.team) ? -1 : 0);});
	}else if (selection == "goles") {
		goalScorers.sort(function(a,b) {return (b.goal - a.goal);}); 
	}
	showGoalScorersOrder(goalScorers);	
}

function showGoalScorersOrder(goalScorers){
	if (localStorage.getItem("goalScorers")) {
		var table = document.getElementById("goalScorer");
		table.innerHTML = null;
		var list = goalScorers;
		for (var k = 0; k < list.length; k++) {
			var row = "<tr><td>" + (k + 1) +
				"</td><td>" + list[k].name +
				"</td><td>" + list[k].goal +
				"</td><td>" + list[k].team +
				"</td></tr>";
			// agregar a la tabla
			var table = document.getElementById("goalScorer");
			table.innerHTML =  table.innerHTML + row;
		}
	}	
}