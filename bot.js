const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");

const sql = require('sqlite');
sql.open('./data.sqlite');

const config = require('./lib/config.json')

const music = require('discord.js-music-v11');

//events in the order they should run
client.on('ready', () => {
  console.log(`Ready to run in ${client.channels.size} channels on ${client.guilds.size} servers, For a total of ${client.users.size} users.`)
});

music(client, {
    prefix: '!!',
    global: false,
    maxQueueSize: 10,
    clearInvoker: true
});

client.on('guildMemberAdd', (member) => {
  let userId = member.user.id;

  console.log(`New User "${member.user.username} has joined "${member.guild.name}"`);
  member.guild.defaultChannel.send(`"${member.user.username}" has joined the server, Please give them a big welcome :thumbsup::exclamation:`)

  sql.run('CREATE TABLE IF NOT EXISTS data (userId TEXT, points INTEGER, level INTEGER, bal INTEGER, msgCount INTEGER)').then(() => {
    sql.run('INSERT INTO data (userId, points, level, bal, msgCount) VALUES (?,?,?,?,?)', [userId, 1, 0, 100, 0]);
  });
})

client.on("message", (message) => {

  let userId = message.author.id;

  if (message.author.bot) return;
  if (message.channel.type === 'dm') {
    message.channel.send(args.join(" "))
  }

  sql.get(`SELECT * FROM data WHERE userId = '${userId}'`).then(row => {
    if (!row) {
      sql.run('INSERT INTO data (userId, points, level, bal, msgCount) VALUES (?,?,?,?,?)', [userId, 1, 0, 100, 0]);
    } else {
      const maxPoints = 100;

      let curPoints = row.points;

      if (curPoints == maxPoints) {
        sql.run(`UPDATE data SET level = ${row.level + 1} WHERE userId = ${userId}`);
        message.channel.send(`Congratulations ${message.author.username} you've attained level **${row.level + 1}!**, as a reward we've given you 50 more :diamond_shape_with_a_dot_inside:\'s'`);
        sql.run(`UPDATE data SET points = ${row.points = 0}, bal = ${row.bal + 50}, msgCount = ${row.msgCount + 1} WHERE userId = ${userId}`)
      } else {
        sql.run(`UPDATE data SET points = ${row.points + 1} WHERE userId = ${userId}`);
        sql.run(`UPDATE data set bal = ${row.bal + 1} WHERE userId = ${userId}`);
        sql.run(`UPDATE data set msgCount = ${row.msgCount + 1} WHERE userId = ${userId}`);
      }
    }
  })

  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let commandFile = require(`./cogs/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err)
  }
});

client.login(config.token);
