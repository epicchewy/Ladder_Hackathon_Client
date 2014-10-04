var REAL_SERVER = "http://shrouded-tundra-3022.herokuapp.com";
var LOCAL_TEST_SERVER = "http://192.169.44.43:5000";
var local_server = "http://localhost:5000";
var page_path = LOCAL_TEST_SERVER;
var page_Name;

var variableSummonerName = "epicchewy";

$(function () 
{
	console.log("hi");
	var path = REAL_SERVER + "/league";
	//var variableSummonerName = "b3lik3t";
	numberOfPages = 0;
	$.ajax({
	 	url: path,
	 	data: { 
	        "summoner_name": variableSummonerName
    	},
	 	context: document.body,
	 	crossDomain: true
	}).done(function( reply ) {
		console.log(reply);
		// keys = Object.keys(reply);
		// alert("done pulling shit bitch");
		console.log("data pulled");
	});	
} );