const command = require('./command');
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class help extends command {

  static match (message){
    return message.content.startsWith('$help')
  }
  static action (message){
    var help = new Discord.RichEmbed()
        //.setAuthor("Commandes", bot.user.avatarURL, true)
        .setThumbnail(message.guild.iconURL)
        .setDescription("Besoin d'aide ?")
        .addField("$help", "Besoin d'aide vielle branche")
        .addField("$ping", "Test ma réactivité")
        .addField("$miroir", "Toi même")
        .addField("$mirpion", "Lance le jeu [en cours de création]")
        .setFooter("menu d'aide")
    message.author.createDM().then(channel => {
        channel.send(help)
    });
  }
}
