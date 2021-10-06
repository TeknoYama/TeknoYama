const db = require('wio.db')
const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json")

exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("Bu Komutu Kullanabilmek için `Yönetici` Yetkisine Sahip Olmalısın");
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek için `Mesajları Yönet` Yetkisine Sahip Olmalıyım")


    const embed = new Discord.MessageEmbed()
        .setTitle("Küfür Engelleme")
        .setDescription("Küfür Engelleme için:\n**e!küfür aç** -> Küfür Engelleme Sistemini açar.\n**e!küfür kapat** -> Küfür Engelleme Sistemini kapatır.")
        .setColor("GREEN")
        .setFooter(ayarlar.footer)
        .setTimestamp()
    if (!args[0]) return message.channel.send(embed)

    if (args[0] == 'aç') {
        db.set(`kufurengel.${message.guild.id}`, "açık")
        const embed = new Discord.MessageEmbed()
            .setTitle("Küfür Engel Açıldı")
            .setDescription("Küfür Engel <@" + message.author.id + "> Tarafından Açıldı!")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
        message.channel.send(embed)

    }
    if (args[0] == 'kapat') {
        db.delete(`kufurengel.${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
            .setTitle("Küfür Engel Kapatıldı")
            .setDescription("Küfür Engel <@" + message.author.id + "> Tarafından Kapatıldı!")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
        message.channel.send(embed)

    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kufur", "küfür-engelle"],
    permLevel: 0
};

exports.help = {
    name: 'küfür',
    description: 'küfür',
    usage: 'küfür'
};