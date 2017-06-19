const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('./data.sqlite');
exports.run = (client, message, args) => {
  if (!args[0]) {
    userId = message.author.id;
    sql.get(`SELECT * from data WHERE userId ='${userId}'`).then(row => {
      const embed = new Discord.RichEmbed()
        .setTitle('User Statistics')
        .setAuthor(`${client.user.username}`)
        .setColor('RANDOM')
        .setDescription(`Current statistics for ${message.author.username}`)
        .setTimestamp()
        .addField('Experience:', `**${row.points} / 100**`, true)
        .addField('Wallet:', `${row.bal}:diamond_shape_with_a_dot_inside:\'s`, true)
        .addField('Level:', `${row.level}`, true)
        .addField('Total Sent Messages (Lifetime):', `${row.msgCount}`, true)
      message.channel.send({
        embed
      });
    })
  } else {
    var userId = args.join(" ");
    userId = userId.replace(/\D/g, '');
    sql.get(`SELECT * from data WHERE userId ='${userId}'`).then(row => {
      const embed = new Discord.RichEmbed()
        .setTitle('User Statistics')
        .setAuthor(`${client.user.username}`)
        .setColor('RANDOM')
        .setDescription(`Current statistics for <@${userId}>`)
        .setTimestamp()
        .addField('Experience:', `**${row.points} / 100**`, true)
        .addField('Wallet:', `${row.bal}:diamond_shape_with_a_dot_inside:\'s`, true)
        .addField('Level:', `${row.level}`, true)
        .addField('Total Sent Messages (Lifetime):', `${row.msgCount}`, true)
      message.channel.send({
        embed
      });
    })
  }
};
