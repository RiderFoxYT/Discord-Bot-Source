const Discord = require('discord.js');
const request = require('request');
exports.run = (client, message, args) => {
  const options = {
    url: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random',
    method: 'GET'
  }
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    const embed = new Discord.RichEmbed()
      .setImage('http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg')
      .setColor('RANDOM')
      .setDescription('Random trump quote')
      .setTimestamp()
      .addField('Your random trump qoute is:', `${json.message}`)
    message.channel.send({
      embed
    });
  });
};
