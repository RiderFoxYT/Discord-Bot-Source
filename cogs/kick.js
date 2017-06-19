exports.run = (client, message, args) => {
  let modRole = message.guild.roles.find("name", "Staff");
  if (!message.member.roles.has(modRole.id)) {
    return message.reply('Sorry, you don\'t have the permission to use this command.').catch(console.error);
  }
  if (message.mentions.users.size === 0) {
    return message.channel.send('You need to mention a user to kick').catch(console.error);
  }
  let kickMember = message.guild.member(message.mentions.users.first());
  if (!kickMember) {
    return message.channel.send('That doesn\'t seem like a valid member to me.').catch(console.error);
  }
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
    return message.reply('Unfortunatly I lack the required permission to preform this action.').catch(console.error);
  }
  kickMember.kick().then(member => {
    message.reply(`${member.user.username} was successfully kicked.`).catch(console.error);
  }).catch(console.error)
}