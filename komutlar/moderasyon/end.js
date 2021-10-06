const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");
const ms = require("ms")

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) if(db.fetch("dil." + message.guild.id) == "EN") return message.channel.send(messages.ingilizce.manage-messages)
    if(!message.member.hasPermission("MANAGE_MESSAGES")) if(!db.fetch("dil." + message.guild.id)) return message.channel.send(messages.türkçe.mesajlari-yonet)
    if(!args[0]) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Please, give a Giveaway Message ID.")

        } else {
            return message.channel.send("Lütfen Çekiliş Mesaj ID sini Giriniz.")
        }

    }

    const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args.join(""))
    if(!giveaway) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Giveaway not found.")

        } else {
            return message.channel.send("Çekiliş Bulunamadı.")
        }

    }

    client.giveaways.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    }).then(() => {
        if(db.has("dil." + message.guild.id)) {
            return message.channel.send(giveaway + " has ben ended.")

        } else {
            return message.channel.send(giveaway + " ID'li Çekiliş Bitirildi")
        }
    }).catch(err => {
        if(err.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended`)) {
            if(db.has("dil." + message.guild.id)) {
                return message.channel.send("The Giveaway is already ended.")
    
            } else {
                return message.channel.send("Bu Çekiliş zaten Bitirilmiş.")
            }
        }
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bitir"],
    permLevel: 0
};

exports.help = {
    name: 'end',
    description: 'temizle.',
    usage: 'temizle'
};