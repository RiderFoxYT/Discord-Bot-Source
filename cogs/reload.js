exports.run = (client, message, args) => {
  let modRole = message.guild.roles.find("name", "Staff");
  if(!message.member.roles.has(modRole.id)){
    return message.reply('Sorry you do not have the permission to reload commands.');
  }
  if(args[0] == null) {
    return message.channel.send(`Must provide a command name to reload.`);
  }
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.channel.send(`Command: **${args[0]}** has been succesfully reloaded, Any changes made to the source code will now be in effect.`)
}
