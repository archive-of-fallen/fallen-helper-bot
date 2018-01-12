const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`[${new Date().toString().substr(0, 23)}] Successfully logged in as ${client.user.tag}!`);
  client.user.setGame("H-hey? Will you be my friend...?")
});

let prefix = "++"

client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'ping')) {
    msg.reply('Why are you interested in checking out my response time?').then(sentMsg => {
        sentMsg.edit(`Pong! [${sentMsg.createdTimestamp - msg.createdTimestamp}ms]`)
      })
  }
});

client.login(process.env.token);
