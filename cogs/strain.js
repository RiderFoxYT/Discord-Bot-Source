const Discord = require('discord.js');

exports.run = (client, message, args) => {
  var request = require('request');
  var webpage = "https://www.cannabisreports.com/api/v1.0/strains/search/";

  var options = {
    url: webpage + args,
    method: 'GET',
    headers: {
      'Accept': '*/*'
    }
  };

  request (options, function(error, response, body){
    if(!error && response.statusCode == 200){
      let json = JSON.parse(body);

      const embed = new Discord.RichEmbed()
        .setTitle('Strain Search')
        .setAuthor(`${client.user.username}`)
        .setColor('RANDOM')
        .setDescription(`Top Cannabis Reports result for ${args.join(" ")}`)
        .setTimestamp()
        .addField('Name:', `${json.data[0].name}`, true)
        .addField('Link:', `${json.data[0].url}`, true)
        .addField('Cannabis Reports UCPC Number:', `${json.data[0].ucpc}`, true)
        .addField('QR Code:', `${json.data[0].qr}`, true)
        .setImage(`${json.data[0].image}`)
      message.channel.send({
        embed
      });
    }
  });

  process.on('uncaughtException', function (err) {
    console.log(err);
    message.channel.sendMessage("### **ERROR 400** ##\nError 400 Bad Request\nUnfortunatly we were unable to locate this strain, Please try again with another strain.");
  });
};
