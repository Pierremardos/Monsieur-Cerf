const command = require('./command');
const Discord = require("discord.js");
const bot = new Discord.Client();
const YoutubeStream = require('ytdl-core')

module.exports = class play extends command {

  static match (message){
    return message.content.startsWith('$stop')
  }
  static action (message){
    let voiceChannel = message.guild.channels
        .filter(function(channel) {
            return channel.type === 'voice'
        })
        .first()
    voiceChannel
        .leave()
  }
}
