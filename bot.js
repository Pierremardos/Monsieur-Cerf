const Discord = require("discord.js");
const bot = new Discord.Client();
const YoutubeStream = require('ytdl-core')



//les link au commands
const ping = require('./commands/ping');
const help = require('./commands/help');
const miroir = require('./commands/miroir');
const infoserver = require('./commands/infoserver');

//link avec la musique
const play = require('./commands/play');
const stop = require('./commands/stop');



bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('Crée par 🍀 Jonas 🍀 ').catch(console.error);
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        channel.send('Bienvenue sur ' + member.guild.name + ', ' + member.displayName + "\n Je suis un petit bot de musique :D");
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});

const prefix = '$';

function sendError(message, description) {
    message.channel.send({
        embed: {
            color: 15158332,
            description: ':x: ' + description
        }
    });
}





//commands
bot.on('message', function (message) {
  let commandUsed = ping.parse(message) || help.parse(message) || miroir.parse(message) || infoserver.parse(message) || play.parse(message) || stop.parse(message)
})


bot.login('NDUzNDUxODMxMzE0NjEyMjM0.DffFmQ.QHTyDQz0-7bZkMsrVdlFRbHxOe8');
