const Discord = require("discord.js");
const client = new Discord.Client();
const Command = require('./command')
const YoutubeStream = require('ytdl-core')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Crée par Jonas').catch(console.error);
});

client.on('message', msg => {
  if (msg.content === '$ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content === '$jonas') {
    msg.reply('Niquez bien vos mère');
  }
});

module.exports = class Play extends Command {
	static match (message) {
		return message.content.startsWith('$play')
	}

	static action(message) {
		let voiceChannel = message.guild.channels
		.filter(function(channel) {return channel.type === 'voice'})
		.first()
		let args = message.content.split(' ')
		voiceChannel
		.join()
		.then(function(connection) {
			let stream = YoutubeStream(args[1])
			connection.playStream(stream).on('end', function () {
				connection.disconnect()
			})
		})
	}
}


client.login('NDUzNDUxODMxMzE0NjEyMjM0.DffFmQ.QHTyDQz0-7bZkMsrVdlFRbHxOe8');
