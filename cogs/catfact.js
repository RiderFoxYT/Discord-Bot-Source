//http://catfacts-api.appspot.com/api/facts?number=1
const Discord = require('discord.js');
const request = require('request');
exports.run = (client, message, args) => {
  const options = {
    url: 'http://catfacts-api.appspot.com/api/facts?number=1',
    method: 'GET'
  }
  request(options, function(err, res, body) {
    let json = JSON.parse(body);
    message.channel.send(json.facts);
  });
};
