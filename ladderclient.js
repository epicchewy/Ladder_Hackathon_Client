//riot and other server work

var REAL_SERVER = "http://shrouded-tundra-3022.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var database_path = "http://personabase.com/ladder/viewdata.php";
var page_path = LOCAL_TEST_SERVER;
var page_Name;

var variableSummonerName = "";
var number_miles;
var latitude;
var longitude;
var players_MileRadius = {};

function loadToDatabase(){
	var path2 = local_server;
	$.ajax({
	    type: 'GET',
		url: 'http://personabase.com/ladder/playerdata.php',
		data: {
		'playerData' : playerData
		},
		dataType: 'jsonp'
		}).done(function(response){
	        console.log(response);
		}).fail(function(error){
	        console.log(error.statusText);
	});
}

function getFromDatabase(){
	var path2 = local_server;
	$.ajax({
	    type: 'GET',
		url: 'http://personabase.com/ladder/getplayer.php',
		data: {
		'summonername' : $("#summonername").val()
		},
		dataType: 'jsonp'
		}).done(function(response){
	        console.log(response);
		}).fail(function(error){
	        console.log(error.statusText);
	});
}

function getByMileRadius(){
	var path2 = local_server;
	$.ajax({
	    type: 'GET',
		url: 'http://personabase.com/ladder/getByLocation.php',
		data: { 
			'longitude' : longitude,
			'latitude' : latitude,
			'radius' : number_miles
		},
		dataType: 'jsonp'
		}).done(function(response){
	        console.log(response);
	        players_MileRadius = response;
		}).fail(function(error){
	        console.log(error.statusText);
	});
}

function getRank() 
{
	variableSummonerName = $("#summonername").val();
	console.log("hi " + variableSummonerName);
	var path = REAL_SERVER + "/league";
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
	var rank_ = rank;
	variableSummonerName = $("#summonername").val();
	playerData["name"] = variableSummonerName;
	playerData["rank"] = rank_;
	
	playerData["mainRole"] = $("#mainRole").val();
	playerData["favChamp"] = $("#favChamp").val();
	//checkChamp($("#favChamp").val());
	
	console.log(playerData);
}

function storePersonData(){
	playerData["age"] = $("#age").val();
	playerData["grade"] = $("#grade").val();
	playerData["school"] = $("#school").val();
	console.log(playerData);
}

function configureLadder(){
	number_miles = $("#miles").val();
	$("#ladderMain div").remove();
	$("#ladderMain").append();
	getByMileRadius();
	console.log(players_MileRadius);
	for(key in players_MileRadius){

	}
	$("#ladderMain").trigger('create');
}

//going to implement drop down menus later for player role and favorite champion

//google maps and location shit

$(document).on('pageinit', '#collectiveData', function() {
        	console.log("locating");
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    initialize(position.coords.latitude,position.coords.longitude);
                });
            }
        });
        function initialize(lat,lng) {
        	console.log("initialiizng");
            var latlng = new google.maps.LatLng(lat, lng);
            var myOptions = {
                zoom: 12,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
            console.log("Latitude: " + lat + "  Longitude: " + lng);
            longitude = lng;
            latitude = lat;
            playerData["longitude"] = lng;
            playerData["latitude"] = lat;
        } 
//databasing

//moxtra client ttoqLOCzQWI client secret nQdWA78QQqg



