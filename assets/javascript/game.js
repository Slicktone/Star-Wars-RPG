// Pseudo Code for Star Wars RPG

/* The player will choose a character by clicking on a picture.
Once selected, the player will fight as that character for the rest of the game. */

// Once a player is selected the remaining characters will be moved down to "Enemies" section.
/* The player will then choose an enemy by clicking on a picture. That enemy will then be moved to the "Defender" Section. */

// Create an array and an object that will access their health, power, and character portrait.

// ****Set up functions for each action thats happening****

$ (document).ready(function() {

var userChar;
var enemies;
var fightSection = [];
var defender;
var isSet = false;
var isEnemySet = false;

var luke = {
	name: "luke",
	health: 200,
	attack: 25,
	selected: false
};


var darthSid = {
	name: "darthSid",
	health: 400,
	attack: 30,
	selected: false
};


var maul = {
	name: "maul",
	health: 300,
	attack: 15,
	selected: false
};

var obiWan = {
	name: "obiwan",
	health: 200,
	attack: 10,
	selected: false
};

var myGameCharacters = [luke, darthSid, maul, obiWan];



// moving the characters
	$(".character").on("click", function() {
	// isSet is declared to false at the top. (15)
	// setting the isSet variable to not true, so the other characters don't move. ()
	if(!isSet) { // if selected character is not the variable isSet, set it equal to true. (44,45)
		isSet = true;
		$('#userChar').append($(this));
		// when a user clicks on a character, it will remove the class and append it.
		$(this).attr("class","currentCharacter")
		// this will take the rest of the characters and move them to the enemies sections.
		// appendTo will add 
		$(".character").appendTo("#enemies")
	} else if (!isEnemySet){
		isEnemySet = true;
		console.log(isEnemySet)
		$(".defender").append($(this));
		$("#userChar, .currentCharacter").appendTo(".attacker");
		var nameSelected = $(this).attr("id");

				}		

});
// Saving the for loop for combat maybe?

// *** Begin combat ***
// function combat(health, attack, name) {

// 	$("button").on("click", function() {
					// for(var i = 0; i < myGameCharacters.length; i++){
					// 	if(nameSelected === myGameCharacters[i].name){
					// 		// console.log(nameSelected)
					// 	}
					// }
// 	})
// }
	

})