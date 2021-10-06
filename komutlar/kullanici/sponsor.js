const Discord = require('discord.js');
ayarlar = require("../../ayarlar.json");
const db = require('wio.db')

exports.run = async(client, message, args) => {

    if(db.has("dil." + message.guild.id)) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Our Sponsors")
        .setDescription("for Sponsor calls: eyyüp.#4823")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    }else {
        const embed = new Discord.MessageEmbed()
        .setTitle("Sponsorlarımız")
        .setDescription("Sponsor Görüşmeleri için: eyyüp.#4823")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sponsor'],
    permLevel: 0
};

exports.help = {
    name: 'sponsors'
};