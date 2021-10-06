const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db")

module.exports.run = async(client, message, args) => {

    if(db.has(`dil.${message.guild.id}`)) {
        const ping = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(ayarlar.isim)
            .setThumbnail(client.user.avatarURL())
            .addField("Bot Ping", client.ws.ping + "ms")
            .setFooter(ayarlar.footer)
            .setTimestamp()
        message.channel.send(ping)
    } else {
        const ping = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(ayarlar.isim)
            .setThumbnail(client.user.avatarURL())
            .addField("Bot Gecikme Hızı", client.ws.ping + "ms")
            .setFooter(ayarlar.footer)
            .setTimestamp()
        message.channel.send(ping)
    }
    
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ping"],
    permLevel: 0
};

module.exports.help = {
    name: 'gecikme',
    description: 'Electus Gecikme',
    usage: 'yardım'
};