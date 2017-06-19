const Discord = require('discord.js');
const config = require('../lib/config.json')

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle('About AllStar - The Discord bot by Skenk')
    .setAuthor('Skenk', 'https://pbs.twimg.com/profile_images/815900758168272896/1OzaOb38.jpg')
    .setColor('#b300f2')
    .setDescription('Just a little bit of information regarding the bot.')
    .addField('Version:', 'Alpha', true)
    .addField('Help Command:', '!!help', true)

    message.channel.send({embed})
}
