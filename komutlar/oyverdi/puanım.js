const Discord = require('discord.js');
const db = require("wio.db")
const ayarlar = require("../../ayarlar.json")

exports.run = async(client, message, args) => {
    let user = message.mentions.members.first() || message.author

    let puan = db.fetch("puan." + user.id) || 0
    const embed = new Discord.MessageEmbed()
        .setTitle(`${user.displayName || user.username} Puan Bilgisi`)
        .setDescription(`Sorgulayan: ${message.member.user.username}\nSorgulanan Kişi: ${user.displayName || user.username}\nPuanları: ${puan}`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(ayarlar.footer)
    message.channel.send(embed)
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["puanım"],
    permLevel: 0,
};

exports.help = {
    name: 'puanları',
    description: 'Oy Verince çalışan Komut',
    usage: 'Oy Verince çalışan Komut',
};