import removeColorFormatting from "./removeColorFormatting.js";
import getScoreFromMessage from "./getScoreFromMessage.js";

function sendGoMessage(scoreNeeded, setSentGoMessage) {
  const scoreboard = Scoreboard.getLines();
  // entry is an object, can be converted to String
  if (scoreboard === undefined) return;
  const line = scoreboard.filter((entry) => entry.toString().includes("Cleared:"))[0];
  if (line === undefined) return;
  const noFormattingLine = removeColorFormatting(line.toString());
  const score = getScoreFromMessage(noFormattingLine);

  if (score >= scoreNeeded) {
    ChatLib.say("/pc It's 300 time https://imgur.com/e0XhBfN");
    setSentGoMessage(true);
  }
}

export default sendGoMessage;
