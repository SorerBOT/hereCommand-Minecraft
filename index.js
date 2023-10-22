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
register("command", (user) => {
  const sentence = welcomeSentences[idx];
  const formattedSentence = sentence.replace("<ign>", user);

  ChatLib.say("/pc " + formattedSentence);
  idx++;  
}).setName("shalom");

register("command", () => {
  const sentence = artOfWarQuotes[artOfWarIndex];
  const formattedSentence = sentence.concat(" - Sun Tzu, The Art of War");
  
  ChatLib.say("/pc " + formattedSentence);
  artOfWarIndex++;  
}).setName("artofwar");

register("chat", (player, drop, event) => {
  let randomNum = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
  let sentence = "There is a "+ randomNum + " chance that "+ player + " will get " + drop;
  ChatLib.say("/pc " + sentence);
}).setCriteria("Will ${player} get ${drop}").setContains();

register("command", (neededClass) => {
  const { players } = playersObject;
  const possiblePlayers = players.filter((player) => player[neededClass]);

  ChatLib.chat(`§3Possible ${neededClass}:\n${possiblePlayers.map((player) => "§6" + player.name).join("§7, ")}`);
}).setName("playerList");
