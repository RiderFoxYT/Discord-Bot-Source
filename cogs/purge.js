exports.run = (client, message, args) => {
  let modRole = message.guild.roles.find("name", "Staff");
  if (!message.member.roles.has(modRole.id)) {
    return message.reply('Sorry, you don\'t have the permission to use this command.').catch(console.error);
  } else {
    let messageCount = parseInt(args[0]);
    message.channel.fetchMessages({limit: messageCount})
      .then(messages => message.channel.bulkDelete(messages));
  }
}
