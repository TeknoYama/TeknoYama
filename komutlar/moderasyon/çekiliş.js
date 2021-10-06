const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");
const ms = require("ms")

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) if(db.fetch("dil." + message.guild.id) == "EN") return message.channel.send(messages.ingilizce.manage-messages)
    if(!message.member.hasPermission("MANAGE_MESSAGES")) if(!db.fetch("dil." + message.guild.id)) return message.channel.send(messages.türkçe.mesajlari-yonet)

    if (!args[0]) return message.channel.send("Lütfen bir Zaman Belirleyin: 1d 1h 1m 1s")
    if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m") && !args[0].endsWith("s")) return message.channel.send("Lütfen bir Zaman Belirleyin: 1d 1h 1m 1s")

    let tarih = Date.now() + ms(args[0])
    let kanal = message.mentions.channels.first()
    let ödül = args.slice(3).join(" ")
    let kazanan = parseInt(args[2])

    if (!kazanan) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Please, give a winner count.")

        } else {
            return message.channel.send("Lütfen kazanacak kişi sayısı giriniz.")
        }

    }

    if (!ödül) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Please, give a Prize.")

        } else {
            return message.channel.send("Lütfen çekilişte verilecek Ödülü Girin.")
        }

    }

    if (!kanal) {

        if(db.has("dil." + message.guild.id)) {
            return message.channel.send("Please, mention a channel.")

        } else {
            return message.channel.send("Lütfen Bir Kanal Etiketleyin.")
        }

    }


    if(db.has("dil." + message.guild.id)) {
        client.giveaways.start(kanal, {
            time: ms(args[0]),
            prize: ödül,
            winnerCount: kazanan,
            hostedBy: ayarlar.hostedBy ? message.author : null,
            messages: {
                giveaway: "🎉🎉🎉NEW GIVEAWAY!🎉🎉🎉",
                giveawayEnded: "🎉🎉🎉GIVEAWAY ENDED🎉🎉🎉",
                timeRemaining: `Time left: **{duration}**`,
                inviteToParticipate: `Click on the "🎉" response to enter the Lottery.`,
                winMessage: `Congratulations {winners}, You Won the ${ödül} raffle\n{messageURL}`,
                embedFooter: "Giveaway Time",
                noWinner: "No one has Won",
                hostedBy: "hosted By: {user}",
                winners: "winners",
                endedAt: "Ended At",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    plurals: false
                }

            },
        })
    } else {
        client.giveaways.start(kanal, {
            time: ms(args[0]),
            prize: ödül,
            winnerCount: kazanan,
            hostedBy: ayarlar.hostedBy ? message.author : null,
            messages: {
                giveaway: "🎉🎉🎉YENİ BİR ÇEKİLİŞ BAŞLADI!🎉🎉🎉",
                giveawayEnded: "🎉🎉🎉Çekiliş Bitti🎉🎉🎉",
                timeRemaining: `Kalan Süre: **{duration}**`,
                inviteToParticipate: `Çekiliş'e katılmak için "🎉" tepkisine Tıklayın.`,
                winMessage: `Tebrikler {winners}, ${ödül} çekilişini Kazandınız\n{messageURL}`,
                embedFooter: "Çekiliş Zamanı",
                noWinner: "Çekilişi Kazanan olmadı",
                hostedBy: "Çekilişi Başlatan {user}",
                winners: "kazananlar",
                endedAt: "Bitiş tarihi",
                units: {
                    seconds: "saniye",
                    minutes: "dakika",
                    hours: "saat",
                    days: "gün",
                    plurals: false
                }

            },
        })
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["çekiliş"],
    permLevel: 0
};

exports.help = {
    name: 'giveaway',
    description: 'temizle.',
    usage: 'temizle'
};