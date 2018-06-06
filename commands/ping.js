const command = require('./command');

module.exports = class ping extends command {

  static match (message){
    return message.content.startsWith('$ping')
  }
  static action (message){
    message.channel.send("Je brâme en :`" + `${message.createdTimestamp - Date.now()}` + " ms`");
  }
}
