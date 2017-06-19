const moment = require('moment');

exports.run = (client, message, args) => {
  const now = new Date();
  const next = new Date(now.getFullYear()+1, 0, 1, 0, 0, 0, 0);

  message.channel.send(`${moment.duration(next - now).humanize()} until ${now.getFullYear()+1}!`);
}
