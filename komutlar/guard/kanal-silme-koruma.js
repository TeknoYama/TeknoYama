const db = require('wio.db')
const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json")

exports.run = async(bot, message, args) => {

    if (!message.guild.owner) return message.channel.send("Bu Komutu Sadece Sunucu Sahibi Kullanabilir!");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Bu Komutu Kullanabilmek için `Kanalları Yönet` Yetkisine Sahip Olmalıyım")


    const embed = new Discord.MessageEmbed()
        .setTitle("Kanal Silme Koruması")
        .setDescription("Kanal Silme Koruması için:\n**e!kanal-silme-koruma aç** -> Kanal Silme Korumasını açar.\n**e!kanal-silme-koruma kapat** -> Kanal Silme Korumasını kapatır.")
        .setColor("GREEN")
        .setFooter(ayarlar.footer)
        .setTimestamp()
    if (!args[0]) return message.channel.send(embed)

    if (args[0] == 'aç') {
        if(!db.has(`kanalsilmekoruması.${message.guild.id}`)) {
            db.set(`kanalsilmekoruması.${message.guild.id}`, "açık")
            const embed = new Discord.MessageEmbed()
                .setTitle("Kanal Silme Koruması Açıldı")
                .setDescription("Kanal Silme Koruması <@" + message.author.id + "> Tarafından Açıldı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)
        } else {
            message.channel.send("Kanal Silme Koruması Zaten Aktif!")
        }
    }
    if (args[0] == 'kapat') {
        if (db.has(`kanalsilmekoruması.${message.guild.id}`)) {
            db.delete(`kanalsilmekoruması.${message.guild.id}`)
            const embed = new Discord.MessageEmbed()
                .setTitle("Kanal Silme Koruması Kapatıldı")
                .setDescription("Kanal Silme Koruması <@" + message.author.id + "> Tarafından Kapatıldı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)

        } else {
            message.channel.send("Kanal Silme Koruması Zaten Kapalı!")
        }
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ks", "kanal-silme"],
    permLevel: 0
};

exports.help = {
    name: 'kanal-silme-koruma',
    description: 'kanal-silme-koruma',
    usage: 'kanal-silme-koruma'
};