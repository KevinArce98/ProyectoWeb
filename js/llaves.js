$(document).ready(function() {  
 var nameTournament = localStorage.getItem("active")
    var journeysAll = JSON.parse(localStorage.getItem('calendar ' + nameTournament));
    var teamsAll = [];
    var resultsAll = [];

    //load the results
    for (var i = 0; i < journeysAll.length; i++) {
        var matchsAll = journeysAll[i].matchs;
        var resultsByRound = [];
        for (var k = 0; k < matchsAll.length; k++) {
            if (matchsAll[k].finished == true) {
                var matchRound = [parseInt(matchsAll[k].goalLocal), parseInt(matchsAll[k].goalVisit)];
                resultsByRound.push(matchRound);
            }else {
                 var matchRound = [null, null];
                resultsByRound.push(matchRound);
            }
        } 
        resultsAll.push(resultsByRound);
    }
    var resultTournament = [resultsAll];
    var matchs = journeysAll[0].matchs;
    // load the teams.
    for (var i = 0; i < matchs.length; i++) {
        var match = [matchs[i].local, matchs[i].visit];
        teamsAll.push(match);
    }
    var leftBracket = {
        teams: teamsAll,
        results: resultTournament
    };
  $(function() {
  $('div#bracket1').bracket({
        teamWidth: 100,
        scoreWidth: 27,
        matchMargin: 30,
        roundMargin: 35,
        init: leftBracket,
        skipConsolationRound: true,
        });
    })         
});
