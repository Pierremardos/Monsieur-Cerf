const command = require('./command');
const Discord = require("discord.js");
const bot = new Discord.Client();
const YoutubeStream = require('ytdl-core')

module.exports = class play extends command {

  static match (message){
    return message.content.startsWith('$play')
  }
  static action (message){
    // On récupère le premier channel audio du serveur
    let voiceChannel = message.guild.channels
        .filter(function(channel) {
            return channel.type === 'voice'
        })
        .first()
    // On récupère les arguments de la commande
    // il faudrait utiliser une expression régulière pour valider le lien youtube
    let args = message.content.split(' ')
    // On rejoint le channel audio
    voiceChannel
        .join()
        .then(function(connection) {
            // On démarre un stream à partir de la vidéo youtube
            let stream = YoutubeStream(args[1])
            stream.on('error', function() {
                message.reply("Je n'ai pas réussi à lire cette vidéo :(")
                connection.disconnect()
            })
            // On envoie le stream au channel audio
            // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
            connection
                .playStream(stream)
                .on('end', function() {
                    connection.disconnect()
                })
        })
  }
}
