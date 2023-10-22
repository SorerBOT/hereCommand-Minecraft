function getScoreFromMessage(message) {
  return message.slice(message.indexOf('(') + 1, message.indexOf(')'));
}

export default getScoreFromMessage;
