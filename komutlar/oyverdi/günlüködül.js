const Discord = require('discord.js');
const DBL = require('dblapi.js')
const db = require("wio.db")
const ms = require("ms")
const ayarlar = require("../../ayarlar.json")

exports.run = async(client, message, args) => {

    let cooldown = 8.64e7, // 24 Saat
        amount = Math.floor(Math.random() * 1000) + 4000;

    let lastDaily = await db.fetch(`gunlukaldi.${message.member.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        const embed = new Discord.MessageEmbed()
            .setTitle("Başarısız")
            .setDescription("Günlük Ödülünü 24 Saat içinde Tekrar Alabilirsin!")
            .setFooter(ayarlar.footer)
            .setColor("RED")
            .setTimestamp()
        message.channel.send(embed)

    } else {

        const dbl = new DBL(ayarlar.dbltoken, client)

        dbl.hasVoted(message.author.id).then(async voteverdi => {
            if (voteverdi) {
                let randomsayi = Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
                db.set("gunlukaldi." + message.member.id, Date.now())
                db.add("puan." + message.author.id, randomsayi)

                const embed = new Discord.MessageEmbed()
                    .setTitle("UuUuU! Günlük Ödül")
                    .setDescription("Günlük Ödülden "+ randomsayi +" Puan Kazandın")
                    .setFooter(ayarlar.footer)
                    .setColor("GREEN")
                    .setTimestamp()
                message.channel.send(embed)

            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Hata! Bot'a Oy Vermemişsin")
                    .setDescription("Oy Vermek İçin Hemen [TIKLA]("+ayarlar.oy+")\n\nEğer Bot'a Oy Verdiysen Sisteme Geçmesi için 1-2 Dakika Bekle!")
                    .setFooter(ayarlar.footer)
                    .setColor("RED")
                    .setTimestamp()
                message.channel.send(embed)

            }
        })
    }
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gunluk-puan", "günlük-puan"],
    permLevel: 0,
};

exports.help = {
    name: 'günlükpuan',
    description: 'Oy Verince çalışan Komut',
    usage: 'Oy Verince çalışan Komut',
};