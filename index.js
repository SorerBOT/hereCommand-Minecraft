import welcomeSentences from "./welcomeSentences";
import artOfWarQuotes from "./artOfWarQuotes";
import playersObject from "./players.js";

let sentGoMessage = false;
let tick = 0;
let idx = 0;
let artOfWarIndex = 0;

function removeColorFormatting(inputString) {
  // Use a regular expression to match color codes (§x) and remove them
  const strippedString = inputString.replace(/§[0-9a-fklmnor]/g, '');
  return strippedString;
}
function getScoreFromMessage(message) {
  return message.slice(message.indexOf('(') + 1, message.indexOf(')'));
}

function sendGoMessage(scoreNeeded) {
  const scoreboard = Scoreboard.getLines();
  // entry is an object, can be converted to String
  if (scoreboard === undefined) return;
  const line = scoreboard.filter((entry) => entry.toString().includes("Cleared:"))[0];
  if (line === undefined) return;
  const noFormattingLine = removeColorFormatting(line.toString());
  const score = getScoreFromMessage(noFormattingLine);

  if (score >= scoreNeeded) {
    ChatLib.say("/pc It's 300 time https://imgur.com/e0XhBfN");
    sentGoMessage = true;
  }
}

register("WorldLoad", () => {
  sentGoMessage = false;
});
register("tick", () => {
  if (tick % 20 == 0 && !sentGoMessage) sendGoMessage(272);
  tick++;
});

register("command", (user, index) => {
  if (index != undefined) {
      idx = index;
  }
  const sentence = sentences[idx];

  const formattedSentence = sentence.replace("<ign>", user);

  ChatLib.say("/pc " + formattedSentence);
  idx++;  
}).setName("shalom");


let artOfWarIndex = 0;
register("command", (index) => {
    if (index != undefined) {
        artOfWarIndex = index;
    }

  const sentence = artOfWarQuotes[artOfWarIndex];
  const formattedSentence = sentence.concat(" - Sun Tzu, The Art of War");
  
  ChatLib.say("/pc " + formattedSentence);
  artOfWarIndex++;  
}).setName("artofwar");


register("command", (user, ...drop) => {
  let randomNum = Math.floor(Math.random() * (100 - 30 + 1)) + 30;

  let sentence = "There is a "+ randomNum + " chance that "+ user + " will get a "+drop;

  let punctuation = /[\.,?!]/g;
  ChatLib.say("/pc The almighty 8-ball, will "+user+ " get a " + drop +" today?");
  setTimeout(() => {
    ChatLib.say("/pc " + sentence + ".");
  }, 500);
}).setName("spinTheDice").setAliases("roll");



register("command", (neededClass) => {
  const { players } = playersObject;
  const possiblePlayers = players.filter((player) => player[neededClass]);

  ChatLib.chat(`§3Possible ${neededClass}:\n${possiblePlayers.map((player) => "§6" + player.name).join("§7, ")}`);
}).setName("playerList");

