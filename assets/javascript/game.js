// Pseudo Code for Star Wars RPG

/* The player will choose a character by clicking on a picture.
Once selected, the player will fight as that character for the rest of the game. */

// Once a player is selected the remaining characters will be moved down to "Enemies" section.
/* The player will then choose an enemy by clicking on a picture. That enemy will then be moved to the "Defender" Section. */

// Create an array and an object that will access their health, power, and character portrait.


$(document).ready(function() {

var obiWan, luke, darthSid, maul, userChar, enemies, fightSection, defender;
var isSet = false;

var myGameCharacters = [
	$("#obiwan.character").data({
		health: 200,
		attack: 200,
		counterAttack: 0,
	}),
	$("#luke.character").data({
		health: 300,
		attack: 300,
		counterAttack: 0,
	}),
	$("#darthsid.character").data({
		health: 500,
		attack: 500,
		counterAttack: 0,
	}),
	$("#maul.character").data({
		health: 400,
		attack: 400,
		counterAttack: 0,
	})

];

$(".character").on("click", function selectedChar() {
	// isSet is declared to false at the top.
	// setting the isSet variable to not true, so the other characters don't move.
	if(!isSet) { // if selected character is not the variable isSet, set it equal to true.
		isSet = true;
		$('#userchar').append($(this));
		// when a user clicks on a character, it will remove the class and append it.
	$(this).attr("class","currentCharacter")
		// this will take the rest of the characters and move them to the enemies sections.
		// appendTo will add 
		$(".character").appendTo("#enemies")
		}
})


// $(".character").on("click", function(){
// 	$("#userchar").append();
		// $("#obiwan").empty();

		
})