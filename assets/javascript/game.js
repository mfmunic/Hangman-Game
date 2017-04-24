//Game of Hangman
//by Marc F. Munic

//In the Game of Hangman, you either win, or you die!

//Global vars-words are pulled from
var house = ["lannister", "targaryen", "stark"];
var objHouse =	{lannister: ["cersei", "tyrion", "tywin", "jaime"],
				targaryen: ["daenerys", "viserys"],
				stark: ["ned", "bran", "arya", "robb", "sansa", "rickon"]}

//picks a house at random then uses that to create the word
//will need to go inside function
var housePick = house[Math.floor(Math.random()*house.length)];
console.log(housePick);
var word = objHouse[housePick][Math.floor(Math.random()*objHouse[housePick].length)];
console.log(word);

//create spaces for number of letters in word
//use --- and different fonts

//use for loop to determine if user's letter is in word ex. a in arya

//create counter for determining loss

//create syntax for determining if user won