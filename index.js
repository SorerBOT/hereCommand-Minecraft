import welcomeSentences from "./welcomeSentences";
import artOfWarQuotes from "./artOfWarQuotes";
import playersObject from "./players.js";
import sendGoMessage from "./Utils/sendGoMessage.js";

const State = {
  sentGoMessage: false,
  tick: 0,
  idx: 0,
  artOfWarIndex: 0,
  setSentGoMessage: (value) => { State.sentGoMessage = value; },
  setTick: (value) => { State.tick = value; },
  setIdx: (value) => { State.idx = value; },
  setArtOfWarIndex: (value) => { State.artOfWarIndex = value; }
}

register("WorldLoad", () => {
  State.setSentGoMessage(false);
});
register("tick", () => {
  if (State.tick % 20 == 0 && !State.sentGoMessage) sendGoMessage(20, State.setSentGoMessage);
  State.setTick(State.tick + 1);
});
register("command", (user, index) => {
  if (index != undefined) State.setIdx(index);

  const sentence = welcomeSentences[State.idx];
  const formattedSentence = sentence.replace("<ign>", user);

  ChatLib.say("/pc " + formattedSentence);
  State.setIdx(State.idx + 1);  
}).setName("shalom");

register("command", (index) => {
  if (index != undefined) State.setArtOfWarIndex(index);
  
  const sentence = artOfWarQuotes[State.artOfWarIndex];
  const formattedSentence = sentence.concat(" - Sun Tzu, The Art of War");
  
  ChatLib.say("/pc " + formattedSentence);
  State.setArtOfWarIndex(State.artOfWarIndex + 1);  
}).setName("artofwar");

register("chat", (player, drop, event) => {
  let randomNum = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
  let sentence = "There is a "+ randomNum + " chance that "+ player + " will get " + drop;
  ChatLib.say("/pc " + sentence);
}).setCriteria("Will ${player} get ${drop}").setContains();

register("command", (neededClass) => {
  const { players } = playersObject;
  const possiblePlayers = players.filter((player) => player.getClass(neededClass));

  ChatLib.chat(`§3Possible ${neededClass}:\n${possiblePlayers.map((player) => "§6" + player.getName()).join("§7, ")}`);
}).setName("playerList");
