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
var turnCounter = 1;
var killCount = 0;

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
$("#luke-health").html('Health ' + myGameCharacters[0].health) // displaying each characters' health.
// add in their attack power as well


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
	}	else if (!isEnemySet){
			isEnemySet = true;
			console.log(isEnemySet);
			$(".defender").append($(this));
			$("#userChar, .currentCharacter").appendTo(".attacker");
	}

	});
    // -----------------------------------------------
    // Functions to RENDER to PAGE
    var renderOne = function(character, renderArea, makeChar) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        // conditional render
        if (makeChar == 'enemy') {
            $(charDiv).addClass("enemy");
        } else if (makeChar == 'defender') {
            defender = character;
            $(charDiv).addClass("target-enemy");
        }
    };

    // functions to render game messages to DOM
    var renderMessage = function(message) {
        var gameMessageSet = $("#gameMessage");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);

        if (message == 'clearMessage') {
            gameMessage.text('');
        }
    };

    // render all characters
    var renderCharacters = function(charObj, areaRender) {
        if (areaRender == '#characters-section') {
            $(areaRender).empty();
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender, '');
                }
            }
        }
        // render user character
        if (areaRender == '#selected-character') {
            renderOne(charObj, areaRender, '');
        }
        // render combatants
        if (areaRender == '#available-to-attack-section') {
            for (var i = 0; i < charObj.length; i++) {
                renderOne(charObj[i], areaRender, 'enemy');
            }
            // render one enemy to defender area
            $(document).on('click', '.enemy', function() {
                // select who you want to fight
                name = ($(this).data('name'));
                // if empty
                if ($('#defender').children().length === 0) {
                    renderCharacters(name, '#defender');
                    $(this).hide();
                    renderMessage("clearMessage");
                }
            });
        }
        // render defender
        if (areaRender == '#defender') {
            $(areaRender).empty();
            for (var i = 0; i < combatants.length; i++ ) {
                // add enemy to defender area
                if (combatants[i].name == charObj) {
                    renderOne(combatants[i], areaRender, 'defender');
                }
            }
        }
        // re-render when attack
        if (areaRender == 'playerDamage') {
            $('#defender').empty();
            renderOne(charObj, '#defender', 'defender');
        }

        // re-render user character when attacked
        if (areaRender == 'enemyDamage') {
            $('#selected-character').empty();
            renderOne(charObj, '#selected-character', '');
        }

        // render defeated
        if (areaRender == 'enemyDefeated') {
            $('#defender').empty();
            var gameStateMessage = "You have defeated " + charObj.name + ", choose your next opponent.";
            renderMessage(gameStateMessage);
        }
    };

    renderCharacters(characters, '#characters-section');
    $(document).on('click', '.character', function() {
        name = $(this).data('name');
        // if no user char selected
        if (!userChar) {
            userChar = characters[name];
            for (var key in characters) {
                if (key != name) {
                    combatants.push(characters[key]);
                }
            }
         $("#characters-setion").hide();
            renderCharacters(userChar, '#selected-character');
            // render all characters for user to choose
            renderCharacters(combatants, '#available-to-attack-section');
        }
    });



    // -------------------------------------------------------
    //  Functions to enable actions based off render functions
    $("#combatButton").on("click", function() {
        // if defender has an enemy
        if ($('.defender').children().length !== 0) {
            var attackMessage = "You attacked " + defender.name + " for " + (userChar.attack * turnCounter) + " damage.";
            // renderMessage("clearMessage");
            // Combat Here
            defender.health = defender.health - (userChar.attack * turnCounter);

            // ON WIN CONDITION
            if (defender.health > 0) {
                // continue playing (renderChar method goes here)
                renderCharacters(defender, "playerDamage");
                // state change here
                var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                userChar.health = userChar.health - defender.enemyAttackBack;
                renderCharacters(userChar, 'enemyDamage');
                if (userChar.health <= 0) {
                    renderMessage("clearMessage");
                    restartGame("You have been defeated...Game Over!");
                    $("#combatButton").unbind("click");
                }
                // Keep killing until you win
            } else {
                renderCharacters(defender, 'enemyDefeated');
                killCount++;
                if (killCount >= 3) {
                    renderMessage("clearMessage");
                    restartGame("You Win, The Force is Strong with this One");
                }
            }
            turnCounter++;
        } else {
            renderMessage("clearMessage");
            renderMessage("No enemy here");
        }
    });

    var restartGame = function(inputEndGame) {
        // when restart is clicked, reload page
        var restart = $('<button>Restart</button>').click(function() {
            location.reload();
        });
        var gameState = $("<div>").text(inputEndGame);
        $("body").append(gameState);
        $("body").append(restart);
    };
});



// ********************DISREGARD*******************
// function combat() {
// 	var abc = $("#userChar");
// 	console.log(abc)
// }

// function characterStats(luke, obiWan, darthSid, maul) {
// 	if(luke === 0 || obiWan === 0 || darthSid === 0 || maul === 0) {
// 		$(".defender").empty();
// 	}
// }
// Saving the for loop for combat maybe?

// *** Begin combat ***
// function combat(health, attack, name) {

// 	$("button").on("click", function() {
// var nameSelected = $(this).attr("id");
// for(var i = 0; i < myGameCharacters.length; i++){
// 	if(nameSelected === myGameCharacters[i].name){
// 		// console.log(nameSelected)
// 	}
// }
// 	})
// }

