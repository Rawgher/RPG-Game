var backgrounds, characters, gameState



function startGame () {
    backgrounds = resetBackgrounds();
    characters = resetCharacters();
    gameState = resetGame();


    displayBackgrounds();

}

function resetBackgrounds () {
    return {
        "Anubis": {
            name: "Temple of Anubis",
            image: "assets/images/temple-of-anubis.jpg",
            audio: "assets/audio/temple-of-anubis.ogg"
        },
        "Eichenwalde": {
            name: "Eichenwalde",
            image: "assets/images/eichenwalde.jpg",
            audio: "assets/audio/eichenwalde.ogg"
        },
        "Hanamura": {
            name: "Hanamura",
            image: "assets/images/hanamura.jpg",
            audio: "assets/audio/hanamura.ogg"
        },
        "Hollywood": {
            name: "Hollywood",
            image: "assets/images/hollywood.jpg",
            audio: "assets/audio/hollywood.ogg"
        },
        "Volskaya": {
            name: "Volskaya Industries",
            image: "assets/images/volskaya-industries.jpg",
            audio: "assets/audio/volskaya-industries.ogg"
        },
        "Kings": {
            name: "King's Row",
            image: "assets/images/kings-row.jpg",
            audio: "assets/audio/kings-row.ogg"
        },
        "Route": {
            name: "Route 66",
            image: "assets/images/route-66.jpg",
            audio: "assets/audio/route-66.ogg"
        },
        "Dorado": {
            name: "Dorado",
            image: "assets/images/dorado.jpg",
            audio: "assets/audio/dorado.ogg"
        },
    }
}
function resetCharacters () {
return  {
    "Winston": {
        name: "Winston",
        image: "assets/images/winston.jpg",
        //image: "assets/images/winston-render.png",
        audio: "assets/audio/winston.m4a",
        attack: 30,
        counterAttack: 25,
        health: 300
    },
    "Reaper": {
        name: "Reaper",
        image: "assets/images/reaper.jpg",
        //image: "assets/images/reaper-render.png",
        audio: "assets/audio/reaper.m4a",
        attack: 20,
        counterAttack: 35,
        health: 200
    },
    "Mercy":{
        name: "Mercy",
        image: "assets/images/mercy.jpg",
        //image: "assets/images/mercy-render.png",
        audio: "assets/audio/mercy.m4a",
        attack: 10,
        counterAttack: 15,
        health: 150
    },
    "Reinhardt": {
        name: "Reinhardt",
        image: "assets/images/reinhardt.jpg",
        //image: "assets/images/reinhardt-render.png",
        audio: "assets/audio/reinhardt.m4a",
        attack: 15,
        counterAttack: 15,
        health: 400
    },
    // "Pharah": {
    //     name: "Pharah",
        // image: "assets/images/pharah-render.png",
        // audio: "assets/audio/",
    //     attack: 20,
    //     counterAttack: 30,
    //     health: 200
    // },
    // "Soldier 76": {
    //     name: "Soldier 76",
    //     image: "assets/images/soldier76-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 25,
    //     health: 200
    // },
    // "McCree": {
    //     name: "McCree",
    //     image: "assets/images/mccree-render.png",
        // audio: "assets/audio/",
    //     attack: 30,
    //     counterAttack: 30,
    //     health: 200
    // },
    // "Zenyatta": {
    //     name: "Zenyatta",
    //     image: "assets/images/zenyatta-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 150
    // },
    // "Widowmaker": {
    //     name: "Widowmaker",
    //     image: "assets/images/widowmaker-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
    // "Roadhog": {
    //     name: "Roadhog",
    //     image: "assets/images/roadhog-render.png",
        // audio: "assets/audio/",
    //     attack: 15,
    //     counterAttack: 15,
    //     health: 400
    // },
};
}

function resetGame () {
    return {
        selectedBackground: null,
        selectedCharacter: null,
        selectedOpponent: null,
        opponentsLeft: 0,
        numAtks: 0
    }
}

function createBackgroundDiv(backgrounds, key) {
    var backgroundDiv = $("<div class='background' data-name=" + key + ">");
    var backgroundImage = $("<img alt='background' class='backgroundImage'>").attr('src', backgrounds.image);
    var backgroundName = $("<div class='backgroundName'>").text(backgrounds.name);
    var backgroundSound = $("<audio><source src='" + backgrounds.audio + "'></source></audio>");
    backgroundDiv.append(backgroundImage).append(backgroundName).append(backgroundSound);
    return backgroundDiv;
}


function createCharacterDiv (characters, key) {
    var characterDiv = $("<div class='character' data-name='" + key + "'>");
    var characterName = $("<div class='characterName'>").text(characters.name);
    var characterImage = $("<img alt='image' class='characterImage'>").attr('src', characters.image);
    var characterHealth = $("<div class='healthPoints'>").text(characters.health);
    var characterSound = $("<audio><source src='" + characters.audio + "'></source></audio>");
    characterDiv.append(characterName).append(characterImage).append(characterHealth).append(characterSound);
    return characterDiv;
  }


function displayBackgrounds () {
    var keys = Object.keys(backgrounds);
    for (var i = 0; i < keys.length; i++) {
        var backgroundKeys = keys[i];
        var background = backgrounds[backgroundKeys];
        var backgroundDiv = createBackgroundDiv(background, backgroundKeys);
        $("#backgroundHolder").append(backgroundDiv);
    }
}

function displayCharacters() {
    var keys = Object.keys(characters);
    for (var i = 0; i < keys.length; i++) {
        var characterKeys = keys[i];
        var character = characters[characterKeys];
        var characterDiv = createCharacterDiv(character, characterKeys);
        $("#chooseCharacter").append(characterDiv);
    }
}

function changeToOpponent (selectedCharacterKey) {
    var characterKeys = Object.keys(characters);
    for (var i = 0; i < characterKeys.length; i++) {
        if (characterKeys[i] !== selectedCharacterKey) {
            var opponentKey = characterKeys[i];
            var opponent = characters[opponentKey];
            var opponentDiv = createCharacterDiv(opponent, opponentKey);
            $(opponentDiv).addClass("enemy");
            $("#enemiesAvailable").append(opponentDiv);
        }
    }
}

function selectOpponent () {
    $(".enemy").on("click.opponentSelect", function () {
        var enemyKey = $(this).attr("data-name");
        gameState.selectedOpponent = characters[enemyKey];
        $("#defender").append(this);
        $("#attack").removeClass(".hidden").show();
        $(this).addClass("defender");
        $(".enemy").off("click.opponentSelect");
        var audio = $(this).find("audio");
        audio[0].volume = 1.0;
        audio[0].play();
    });
}

function attack(numAtks) {
    gameState.selectedOpponent.health -= gameState.selectedCharacter.attack * numAtks;
}

function defend() {
    gameState.selectedCharacter.health -= gameState.selectedOpponent.counterAttack;
}

function didIDie(character) {
    return character.health <= 0;
}

function didIWin() {
    return gameState.opponentsLeft === 0;
}

function isBattleOver() {
if (didIDie(gameState.selectedCharacter)) {
    alert(gameState.selectedOpponent.name + " pwned you n00b. Click the reset button to show them who's boss next time.");
    $("#characterHolder").empty();
    $("#reset").removeClass(".hidden").show();

    return true;
} else if (didIDie(gameState.selectedOpponent)) {
    gameState.opponentsLeft--
    $("#defender").empty();

    if (didIWin()) {
        alert("You win! Hit the reset button to play again!");
        $("#reset").removeClass(".hidden").show();
    } else {
        alert("You beat " + gameState.selectedOpponent.name + "! Choose a new opponent!");
        selectOpponent();
    }
    return true;
}
return false;
}

function emptyAllDivs() {
    $("#characterHolder").empty();
    $("#defender").empty();
    $("#enemiesAvailable").empty();
    $("#chooseCharacter").empty().hide();
    $(".character-select").addClass("hidden");
    $("#yourCharacter").addClass("hidden");
    $("#chooseOne").addClass("hidden");
    $("#defenderName").addClass("hidden");
    $("#characters").show();
    $("#backgroundHolder").empty().show();
    $(".mapChoice").show();
}

$(document).ready(function() {


$("#backgroundHolder").on("click", ".background", function (){ 
    var selectedKey = $(this).attr("data-name");
    gameState.selectedBackground = backgrounds[selectedKey];
    $("html").css("background", "url('" + gameState.selectedBackground.image + "') no-repeat center center fixed"); 
    var audio = $(this).find("audio");
    audio[0].volume = 0.1;
    audio[0].play();
    $("#backgroundHolder").hide();
    $(".mapChoice").hide();
    $(".character-select").removeClass("hidden");
    $("#chooseCharacter").show();
    displayCharacters();
    });

    $("#chooseCharacter").on("click", ".character", function() {
        var selectedKey = $(this).attr("data-name");
        gameState.selectedCharacter = characters[selectedKey];
        $("#characterHolder").append(this);
        var audio = $(this).find("audio");
        audio.volume = 1.0;
        audio[0].play();
        $(this).addClass("yours");

         changeToOpponent(selectedKey);
        $("#characters").hide();
        $("#chooseCharacter").hide();
        $("#yourCharacter").removeClass("hidden");
        $("#chooseOne").removeClass("hidden");

        gameState.opponentsLeft = Object.keys(characters).length -1;
        selectOpponent();
        $("#defenderName").removeClass("hidden");

    });

    $("#attack").on("click.attack", function(){
        gameState.numAtks++
        attack(gameState.numAtks);
        defend();

        $("#characterHolder .healthPoints").text(gameState.selectedCharacter.health);
        $("#defender .healthPoints").text(gameState.selectedOpponent.health);

        if (isBattleOver()) {
            $(this).hide();
        }
    })

    $("#reset").on("click.reset", function (){
        emptyAllDivs();
        $(this).hide();
        startGame();
    })

    startGame();
});

