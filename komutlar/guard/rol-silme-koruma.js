const db = require('wio.db')
const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json")

exports.run = async(bot, message, args) => {

    if (!message.guild.owner) return message.channel.send("Bu Komutu Sadece Sunucu Sahibi Kullanabilir!");
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bu Komutu Kullanabilmek için `Rolleri Yönet` Yetkisine Sahip Olmalıyım")


    const embed = new Discord.MessageEmbed()
        .setTitle("Rol Silme Koruması")
        .setDescription("Rol Silme Koruması için:\n**e!rol-silme-koruma aç** -> Rol Silme Korumasını açar.\n**e!rol-silme-koruma kapat** -> Rol Silme Korumasını kapatır.")
        .setColor("GREEN")
        .setFooter(ayarlar.footer)
        .setTimestamp()
    if (!args[0]) return message.channel.send(embed)

    if (args[0] == 'aç') {
        if(!db.has(`rolsilmekoruması.${message.guild.id}`)) {
            db.set(`rolsilmekoruması.${message.guild.id}`, "açık")
            const embed = new Discord.MessageEmbed()
                .setTitle("Rol Silme Koruması Açıldı")
                .setDescription("Rol Silme Koruması <@" + message.author.id + "> Tarafından Açıldı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)
        } else {
            message.channel.send("Rol Silme Koruması Zaten Aktif!")
        }
    }
    if (args[0] == 'kapat') {
        if (db.has(`rolsilmekoruması.${message.guild.id}`)) {
            db.delete(`rolsilmekoruması.${message.guild.id}`)
            const embed = new Discord.MessageEmbed()
                .setTitle("Rol Silme Koruması Kapatıldı")
                .setDescription("Rol Silme Koruması <@" + message.author.id + "> Tarafından Kapatıldı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)

        } else {
            message.channel.send("Rol Silme Koruması Zaten Kapalı!")
        }
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rs", "rol-silme"],
    permLevel: 0
};

exports.help = {
    name: 'rol-silme-koruma',
    description: 'rol-silme-koruma',
    usage: 'rol-silme-koruma'
};