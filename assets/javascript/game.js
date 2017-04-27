//Game of Hangman
//In the Game of Hangman, you either win, or you die!
//by Marc F. Munic

//global variable farm
var house = ["lannister", "targaryen", "stark", "baratheon", "tully"];
var objHouse =	{lannister: ["cersei", "tyrion", "tywin", "jaime"],
				targaryen: ["daenerys", "viserys"],
				stark: ["ned", "bran", "arya", "robb", "sansa", "rickon"],
				baratheon: ["robert", "joffrey", "stannis", "renly"],
				tully: ["catelyn", "lysa"]
				}

var word = "";
var housePick = "";

//used to keep track of banners won
var bannerRec = [];
var houseIx = 0;

//used to validate letter variable
var alphabet = "abcdefghijklmnopqrstuvwxyz";
//used to build blank spaces
var arrayBlanks = [];

//used to make sure same letter is pressed twice
var arrayGuesses = [];
var guessesLeft = 9;

//used to log wrong guesses
//if length = 9 then dead
var arrayWrong = [];
var checkWin = 0;

//create spaces for number of letters in word
function createBlanks() {

	//pick a random house and make sure the banner was not already collected.
	var houseSet = function(){
		var houseTest = Math.floor(Math.random()*house.length)
			if (bannerRec.length > 0){
				for (i=0;i<bannerRec.length;i++){
					console.log(houseTest)
					if (houseTest == bannerRec[i]){
						houseTest = houseSet()
					}
				}
			}
		return houseTest;
	}

	houseIx = houseSet();

	//picks a house at random then uses that to create the word
	housePick = house[houseIx];
	word = objHouse[housePick][Math.floor(Math.random()*objHouse[housePick].length)];
		
	document.getElementById("banner").src = "assets/images/"+housePick+".png";

	//cheat
	console.log(housePick);
	console.log(word);

	checkWin = 0;

	for (i=0; i<word.length; i++){
		arrayBlanks.push("_ ");
	}//end for loop

	document.getElementById("dead").innerHTML = guessesLeft;
	// document.getElementById("house").innerHTML = housePick.charAt(0).toUpperCase() + housePick.slice(1);
	document.getElementById("wordSpace").innerHTML = arrayBlanks.join("");
}//end for createBlanks


window.onkeyup = function(event){
	var letter = event.key;
	var checkLoss = 0

	//validate
	if (alphabet.includes(event.key) && !arrayGuesses.includes(event.key)){
		arrayGuesses.push(letter);

		//check word for letter guesses
		for (i=0; i<word.length; i++) {

			if (letter == word.charAt(i)){

				//adds letters
				arrayBlanks[i] = letter;

				//replaces first letter with capital
				if (i == 0) {
					arrayBlanks[0] = letter.toUpperCase();
				}

				document.getElementById("wordSpace").innerHTML = arrayBlanks.join("");
					
				checkLoss = 1;
				checkWin++
			}


		}//end of for loop

		if (checkWin == word.length){
			win();
		}

		//if letter is not in word
		if (checkLoss == 0) {
			arrayWrong.push(letter);
			guessesLeft--;
			console.log("1; guessesLeft"+guessesLeft);
			document.getElementById("dead").innerHTML = guessesLeft;
			document.getElementById("wrongSpace").innerHTML = arrayWrong.join(" ");
				if (arrayWrong.length == 9) {
					//guessesLeft--;
					console.log("2; guessesLeft"+guessesLeft);
					document.getElementById("dead").innerHTML = guessesLeft;
					setTimeout(dead(), 1000);
				}
		}//end of if not in word
		
		//9 wrong answers ends game

	}//end of validate and run if statement	
}//end of on key function

function dead(){
	document.getElementById("dead").innerHTML = guessesLeft;
	setTimeout(alert("You have Died!"), 1000);

	arrayWrong.length = 0;//reset arrays
	arrayBlanks.length = 0;
	arrayGuesses.length = 0;
	guessesLeft = 9;
	//dispay arrays
	document.getElementById("wrongSpace").innerHTML = arrayBlanks.join(" ");
	document.getElementById("wrongSpace").innerHTML = arrayWrong.join(" ");

	createBlanks();
}


function win(){
	bannerRec.push(houseIx);



	arrayWrong.length = 0;//reset arrays
	arrayBlanks.length = 0;
	arrayGuesses.length = 0;
	
	//dispay arrays
	document.getElementById("wrongSpace").innerHTML = arrayBlanks.join(" ");
	document.getElementById("wrongSpace").innerHTML = arrayWrong.join(" ");
	winBanner();
	if(bannerRec.length == 5){
		winBanner();

		var audio = new Audio('assets/images/theme_song.mp3');
		audio.play();

		bannerRec.length = 0;
		alert("You may sit on the Iron Throne");
		location.reload();
	}
	createBlanks();
}

function winBanner(){
	var listItem = document.createElement("li");
	var wonBanner = document.createElement("img");

	wonBanner.setAttribute("id", "ban"+bannerRec.length);
	listItem.appendChild(wonBanner);	
	wonBanner.src = "assets/images/"+housePick+".png";
	
	document.getElementById("wonBanners").appendChild(listItem);
	document.getElementById("ban"+bannerRec.length).style.height = "145px";
	document.getElementById("ban"+bannerRec.length).style.display = "inline";
	document.getElementById("ban"+bannerRec.length).style.float = "left";
}