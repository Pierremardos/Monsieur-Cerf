const command = require('./command');
const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = class infoserver extends command {

  static match (message){
    return message.content.startsWith('$infoserver')
  }

  static action (message){
    var embed = new Discord.RichEmbed()
        .setDescription("Information du Discord")
        .addField("Nom du Discord", message.guild.name)
        .addField("Créé le", message.guild.createdAt)
        .addField("Tu as rejoins le", message.member.joinedAt)
        .addField("Utilisateurs sur le Discord", message.guild.memberCount)
        .setColor("0x0000FF")
    message.channel.sendEmbed(embed)
  }
}
