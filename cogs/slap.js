exports.run = (client, message, args) => {
  return message.channel.send(`${message.author} has decided to slap ${args[0]} for reasons unknown`);
}
