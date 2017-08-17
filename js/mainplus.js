function enableLi() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	var tournamentName = localStorage.getItem("active");
	if (tournamentName != null) {
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
	}else {
		disabledLi();
	}
}
enableLi();

function disabledLi() {
	var li = document.getElementsByClassName("available");
	for (var i = 0; i < li.length; i++) {
		li[i].style.display = "none";
	}
}