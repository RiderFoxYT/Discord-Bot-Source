const sql = require('sqlite');
sql.open('./data.sqlite');

exports.run = (client, message, args) => {
  let wager = args[0];
  let winnings = args[0] * 2;
  let minBal = 10;

  userId = message.author.id

  sql.get(`SELECT * FROM data WHERE userId = '${userId}'`).then(row => {
    if(row.bal <= wager) {
      message.channel.send('You cannot wager more than you own!');
    } else {
      if (row.bal >= minBal) {
        if (Math.random() < 0.2) {
          message.channel.send(`Congratulations ${message.author}, you have survived and taken the pot of **${winnings} :diamond_shape_with_a_dot_inside:**\'s.`);
          sql.run(`UPDATE data set bal = ${row.bal + winnings} WHERE userId = ${userId}`);
        } else {
          message.channel.send(`${message.author} has shot themselves in the head, Fortunatly the gun happened to be a nerf gun.`);
          sql.run(`UPDATE data set bal = ${row.bal - args[0]} WHERE userId = ${userId}`);
        }
      } else {
        message.channel.send('Sorry, You need at least 10:diamond_shape_with_a_dot_inside:\'s to wager.')
      }
    }
  });
};
