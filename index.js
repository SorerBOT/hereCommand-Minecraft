const sentences = [
    "He is here, the man they all fear, the one with the greatest clear. He has the fastest runs, he scares all the NONs, <ign> !!",
    "Behold, the virtual legend that is <ign>, the master of gaming, he conquers every room with his mere presence slaying mobs by his mere glance.",
    "From the shadows of the game world, emerges a force, a gamer of unmatched secret routes. Brace yourselves for the power of <ign>.",
    "Can you hear that sound? It\’s <ign> coming \'round, fast in motion never in commotion, his terminator, always sounds like an explosion.",
    "The one with the greatest gaming chair, the greasiest hair, he never needs no showER, <ign> is here to save the day from p-findER",
    "Lo and behold, the man of whom legends are told. He is no troll, he is no joke, before the runs he snorts some coke, <ign>!!",
    "When the battlefield trembles, and the opposition crumbles, there's one name that constantly rumbles <ign>, every mob's worst nightmare.",
    "Is it an aeroplane? Is it a bird? NO, it is the man, the myth, the legend- <ign>",
    "Whilst delving into the catacombs and facing the most worrisome of enemies; This is the one player you would want on your side <ign>"
];

let idx = 0;

register("command", (user) => {
  const sentence = sentences[idx];
  const formattedSentence = sentence.replace("<ign>", user);

  ChatLib.say("/pc " + formattedSentence);
  idx++;  
}).setName("shalom");
