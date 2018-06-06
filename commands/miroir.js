const command = require('./command');

module.exports = class miroir extends command {

  static match (message){
    return message.content.startsWith('$miroir')
  }
  static action (message){
    message.channel.send('Toi même')
    message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
  }
}
