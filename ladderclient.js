//riot and other server work

var REAL_SERVER = "http://shrouded-tundra-3022.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var database_path = "http://personabase.com/ladder/viewdata.php";
var page_path = LOCAL_TEST_SERVER;
var page_Name;

var variableSummonerName = "";

function loadToDatabase(){
	var path2 = local_server;
	$.ajax({
		url: database_path,
		contentType: "application/json; charset=utf-8",
		data:{
			'PlayerData': JSON.stringify(playerData) ,
		},
		dataType: "json",
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
	var rank_ = rank;
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

//going to implement drop down menus later for player role and favorite champion

// function checkChamp(str){
// 	var names = "Aatrox Ahri Akali Alistar Amumu Anivia Annie Ashe Blitzcrank Brand Braum Caitlyn Cassiopeia Cho'Gath Corki Darius Diana Dr.Mundo Draven Elize Evelynn Ezreal Fiddlesticks Fiora Fizz Galio Gangplank Garen Gnar Gragas Graves Hecarim Heimerdinger Irelia Janna JarvanIV Jax Jayce Jinx Karma Karthus Kassadin Katarina Kayle Kennen Kha'Zix Kog'Maw LeBlanc LeeSin Leona Lissandra Lucian LuLu Lux Malphite Malzahar Maokai MasterYi MissFortune Mordekaiser Morgana Nami Nasus Nautilus Nocturne Nunu Olaf Orianna Pantheon Poppy Quinn Rammus Renekton Rengar Riven Rumble Ryze Sejuani Shaco Shen Shyvanna Singed Sion Sivir Skarner Sona Soraka Swain Syndra Talon Taric Teemo Thresh Tristana Trundle Tryndamere Twitch Varus Vayne Veigar Vel'Koz Vi Viktor Vladimir Volibear Warwick Wukong Xerath XinZhao Yasuo Yorick Zac Zed Ziggs Zilean Zyra";
// 	var newname = names.split(" ");
// 	for(var i =0; i < newname.length; i++){
// 		if($("#favChamp").val()){

// 		}
			
// 	}
// 	alert("Select a real champ");
// }

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
            playerData["longitude"] = lng;
            playerData["latitude"] = lat;
        } 
//databasing

//moxtra client ttoqLOCzQWI client secret nQdWA78QQqg

