const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek için `Mesajları Yönet` Yetkisine Sahip Olmalısın");
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek için `Mesajları Yönet` Yetkisine Sahip Olmalıyım")

    let sayı = parseInt(args[0])

    if (sayı <= 1) {
        if(db.has("dil." + message.guild.id)) {
            return message.channel.send(":no_entry: You can delete minimum 2 messages").then(b => b.delete({timeout:3000}))
        }else {
            return message.channel.send(":no_entry: Minimum 2 Mesaj Silebilirsin").then(b => b.delete({timeout:3000}))
        }
    }



    if (sayı <= 100) {
        message.channel.bulkDelete(sayı).catch(err => {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send(":no_entry: Discord API does not allow to delete messages older than 14 days").then(b => b.delete({timeout:3000}))
            } else {
                message.channel.send(":no_entry 14 Günden Eski Mesajları Silmeme Discord API izin vermiyor.").then(b => b.delete({timeout:3000}))
            }
        })
        if(db.has("dil." + message.guild.id)) {
            message.channel.send(":rocket: You deleted " + sayı + " messages").then(b => b.delete({timeout:3000}))
        } else {
            message.channel.send(":rocket: " + sayı + " adet Mesaj Uzaya Uçuruldu!").then(b => b.delete({timeout:3000}))
        }
    } else {
        if(db.has("dil." + message.guild.id)) {
            message.channel.send(":no_entry: Message Deletion Limit: 100").then(b => b.delete({timeout:3000}))
        }else {
            message.channel.send(":no_entry: Mesaj Silme Limiti: 100").then(b => b.delete({timeout:3000}))
        }
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sil", "clear"],
    permLevel: 0
};

exports.help = {
    name: 'temizle',
    description: 'temizle.',
    usage: 'temizle'
};