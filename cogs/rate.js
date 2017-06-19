exports.run = (client, message, args) => {
  if (args[0] == null){
    message.channel.send('Sorry but you need to give me something to rate.');
  } else {
    score = Math.floor(Math.random() * 10) + 0;
    message.channel.send(`I rate ${args.join(" ")} a solid **${score}** out of 10.`)
}
}
