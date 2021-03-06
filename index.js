const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`[${new Date().toString().substr(0, 23)}] Successfully logged in as ${client.user.tag}!`);
  client.user.setGame("You do not need to know my purpose.")
});

const prefix = "++"

const authorizedUsers = [ "300992784020668416", "299175087389802496", "298706728856453121" ]

client.on('message', msg => { 
  msg.guild.members.filter(mem => {
      mem.displayName.startsWith("!") && 
      mem.setNickname(`${mem.displayName.replace(/^(\s|!)+/,"") || mem.user.username.replace(/^(\s|!)+/,"") || "."}`);
    }); 

  if (msg.content.startsWith(prefix + 'ping')) {
    msg.reply('Why are you interested in checking out my response time?').then(sentMsg => {
      sentMsg.edit(`Pong! [${sentMsg.createdTimestamp - msg.createdTimestamp}ms]`);
    });
  }
  
  if (msg.content.startsWith(prefix + 'eval')) {
    // if (msg.author.id !== "300992784020668416") return;
    if (!authorizedUsers.includes(msg.author.id)) return;
    try {
      const code = msg.content.split(" ").slice(1).join(" ");
      let evaled = eval(code);
      if (!code) {
            return msg.channel.send("Please provide something for me to eval!");
      }
    
      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);
        
        msg.channel.send("Evaluating, please wait...").then(sentMsg => {
          msg.channel.send('📤 Success! Here is your output:');
          sentMsg.edit(`${clean(evaled)}`, { code: 'js' });
        });
    } catch(err) {
        msg.channel.send("Evaluating, please wait...").then(sentMsg => {
          msg.channel.send('📤 Oh no, an error occurred! Here is your output:');
          sentMsg.edit(`${clean(err)}`, { code: 'js' });
        });
    }
  }
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

client.login(process.env.token);
