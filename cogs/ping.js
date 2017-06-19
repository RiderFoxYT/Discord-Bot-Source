exports.run = (client, message, args) => {
  message.channel.send(`Response recieved in \`${Date.now() - message.createdTimestamp} ms\``);
}
