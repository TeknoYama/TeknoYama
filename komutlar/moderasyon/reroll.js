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
    const giveaway = client.giveaways.giveaways.find((g) => g.messageID === args[0])
    if(!giveaway) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Giveaway not found.")

        } else {
            return message.channel.send("Çekiliş Bulunamadı.")
        }

    }

    if(db.has("dil." + message.guild.id)) {
        client.giveaways.reroll(giveaway.messageID, {
            winnerCount: null,
            messages: {
                congrat: 'Congratulations {winners}, You are the new Winner of the raffle!\n{messageURL}',
                error: 'No one has Won'
            }
        })
    } else {
        client.giveaways.reroll(giveaway.messageID, {
            winnerCount: null,
            messages: {
                congrat: 'Tebrikler {winners} çekilişin yeni kazananı sensin!\n{messageURL}',
                error: 'Çekilişi Kazanan olmadı'
            }
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yenile"],
    permLevel: 0
};

exports.help = {
    name: 'reroll',
    description: 'temizle.',
    usage: 'temizle'
};