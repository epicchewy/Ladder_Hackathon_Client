//riot and other server work

var REAL_SERVER = "http://shrouded-tundra-3022.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var page_path = LOCAL_TEST_SERVER;
var page_Name;

var variableSummonerName = "";

function loadToDatabase(){
	var path2 = local_server;
	$.ajax({
		url: path2,
		data:{
			"player_data":playerData
		},
		context:document.body,
		crossDomain:true
	}).done(function(reply){
		console.log("done pushing to database");
	});
}

function getRank() 
{
	variableSummonerName = $("#summonername").val();
	console.log("hi " + variableSummonerName);
	var path = local_server + "/league";
	$.ajax({
	 	url: path,
	 	data: { 
	        "summoner_name": variableSummonerName
    	},
	 	context: document.body,
	 	crossDomain: true
	}).done(function( reply ) {
		if(reply === undefined){
			alert("Summoner doesn't exist!");
		}
		console.log(reply);
		ID = reply["ID"];
		console.log(reply["summoner_rank"][ID][0]["tier"] + "  " + reply["summoner_rank"][ID][0]["entries"][0]["division"]);
		rank = reply["summoner_rank"][ID][0]["tier"] + "  " + reply["summoner_rank"][ID][0]["entries"][0]["division"];
		console.log("data apulled");
		displayRank();
	});	
}
var ID  = 0;
var rank;
//ui work
function clicked(){
	console.log("clicked");
}
function displayRank(){
	console.log("displaying");
	$("#displayRank").append('<table data-role="table" id ="rankTable" data-mode = "reflow"><thead><tr id="rankTableHead""><td>Rank:  </td></tr></thead><tbody><tr id="rankTableBody"><td>'+ rank +'</td></tr></tbody></table>');
	$("#displayRank").trigger('create');
	$("#displayRank2").append('<table data-role="table" id ="rankTable" data-mode = "reflow"><thead><tr id="rankTableHead""><td>Rank:  </td></tr></thead><tbody><tr id="rankTableBody"><td>'+ rank +'</td></tr></tbody></table>');
	$("#displayRank2").trigger('create');
}

var playerData = {};

function storeGameData(){
	playerData["rank"] = rank;
	playerData["mainRole"] = $("#mainRole").val();
	playerData["favChamp"] = $("#favChamp").val();
	console.log(playerData);
}

function storePersonData(){
	playerData["age"] = $("#age").val();
	playerData["grade"] = $("#grade").val();
	playerData["school"] = $("#school").val();
	console.log(playerData);
}

//google maps and location shit


//databasing

//moxtra client ttoqLOCzQWI client secret nQdWA78QQqg

