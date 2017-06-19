const sql = require('sqlite');
sql.open('./data.sqlite');

exports.run = (client, message, args) => {

  var victim = args.join(" ");
  victim = victim.replace(/\D/g, '');

  let userId = message.author.id;

  let winnings = 330;
  let losses = 14;

  let modRole = message.guild.roles.find("name", "Staff");

  sql.get(`SELECT * from data WHERE userId ='${userId}'`).then(row => {
  if (!message.member.roles.has(modRole.id)) {
    return message.reply('The person you are attempting to steal from is omnipotent and has caught you. In recompence they have taken funds right from your pocket.').catch(console.error);
      sql.run(`UPDATE data set bal = ${row.bal - losses} WHERE userId = ${userId}`);
      sql.run(`UPDATE data set bal = ${row.bal + winnings} where userId = ${victim}`)
  } else if (!args) {
    message.channel.send('Please choose sombody to pickpocket!')
  } else {
    if (Math.random() < 0.4) {
      message.channel.send(`Congratulations ${message.author}, you have succesfuly picked the pocket of ${args[0]} and taken ${winnings}:diamond_shape_with_a_dot_inside:\'s from their pocket.`);
      sql.run(`UPDATE data set bal = ${row.bal + winnings} WHERE userId = ${userId}`);
      sql.run(`UPDATE data set bal = ${row.bal - losses} where userId = ${victim}`)
    } else {
      message.channel.send(`You dun fucked up, You got noticed by ${args[0]}. They kicked your ass and made you cry to your mummy, they also took ${losses}:diamond_shape_with_a_dot_inside:\'s from your pocket.`);
      sql.run(`UPDATE data set bal = ${row.bal - losses} WHERE userId = ${userId}`);
      sql.run(`UPDATE data set bal = ${row.bal + winnings} where userId = ${victim}`)
    }
  }
})
};
