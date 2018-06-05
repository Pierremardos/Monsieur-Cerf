const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('Crée par Jonas').catch(console.error);
});

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    channel.send('Bienvenue sur ' + member.guild.name + ' ' + member.displayName);
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
});

const prefix = '$';


function sendError(message, description) {
	message.channel.send({embed: {
		color : 15158332,
		description: ':x: ' + description
	}});
}


bot.on('message', message => {
	if(message.content[0] === prefix) {
    let splitMessage = message.content.split(" ");
      if (splitMessage[0] === prefix + "infoserver") {
        var embed = new Discord.RichEmbed()
			.setDescription("Information du Discord")
			.addField("Nom du Discord", message.guild.name)
			.addField("Créé le", message.guild.createdAt)
			.addField("Tu as rejoins le", message.member.joinedAt)
			.addField("Utilisateurs sur le Discord", message.guild.memberCount)
			.setColor("0x0000FF")
			message.channel.sendEmbed(embed)
      }

      //ping
      else if (message.content === prefix + "ping")
			message.channel.send("Je brâme en :`" + `${message.createdTimestamp - Date.now()}` + " ms`");


      else if (message.content.startsWith('$play')) {
        // On récupère le premier channel audio du serveur
        let voiceChannel = message.guild.channels
          .filter(function (channel) { return channel.type === 'voice' })
          .first()
        // On récupère les arguments de la commande
        // il faudrait utiliser une expression régulière pour valider le lien youtube
        let args = message.content.split(' ')
        // On rejoint le channel audio
        voiceChannel
          .join()
          .then(function (connection) {
            // On démarre un stream à partir de la vidéo youtube
            let stream = YoutubeStream(args[1])
            stream.on('error', function () {
              message.reply("Je n'ai pas réussi à lire cette vidéo :(")
              connection.disconnect()
            })
            // On envoie le stream au channel audio
            // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
            connection
              .playStream(stream)
              .on('end', function () {
                connection.disconnect()
              })
          })
      }


      else sendError(message, "Erreur, problème dans les paramètres");

}

});

bot.login('NDUzNDUxODMxMzE0NjEyMjM0.DffFmQ.QHTyDQz0-7bZkMsrVdlFRbHxOe8');
