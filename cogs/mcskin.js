const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setImage(`https://mcapi.ca/skin/${args[0]}`)
      .setColor('RANDOM')
      .setDescription(`You requested the Minecraft skin of **${args[0]}**`)
      .setTimestamp()
    message.channel.send({embed});
};
