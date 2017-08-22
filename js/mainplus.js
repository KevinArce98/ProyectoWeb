function enableLi() {
	var tournaments = JSON.parse(localStorage.getItem('tournaments'));
	var tournament;
	var tournamentName = localStorage.getItem("active");
	if (tournamentName != null) {
		if (tournaments != null) {
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
		document.getElementById("otro").style.display = 'none';
		document.getElementById("text").style.display = 'none';
		disabledLi();
	}
		
	}else {
		if (location.href == "Principal.html") {
			document.getElementById("otro").style.display = 'none';
			document.getElementById("text").style.display = 'none';
		}
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

function closeSession(){
	var btnClose = document.getElementById("closeSession");
	btnClose.addEventListener("click", function(){
		localStorage.removeItem("userActive");
		localStorage.removeItem("active");
		location.href = "index.html";
	});
}
closeSession();