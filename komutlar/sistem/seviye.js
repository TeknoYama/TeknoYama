const Discord = require('discord.js');
const ayarlar = require('../../ayarlar.json');
const db = require("wio.db")

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu Komutu Kullanabilmek için `Yönetici` Yetkisine Sahip Olmalısın!");


    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(ayarlar.isim+" Seviye Komutları")
            .setDescription("Seviye Örnek Komut: e!seviye xpayar\n")
            .addField("Seviye", "**e!seviye xpayar [xp]** -> Mesaj Başı verilcek XP ayarlar.\n**e!seviye kanal [#kanal]** -> Log Kanalını ayarlar.\n**e!seviye kapat** -> Seviye Sistemini kapatır.\n**e!seviye aç** -> Seviye Sistemini açar.\n**e!rank** -> Seviye Bilgilerini Gösterir.")
            .setTimestamp()
            .setFooter(ayarlar.footer);

        message.channel.send({embed});
    }

    if (args[0] == "aç") {

        if (!db.has("seviyesistem." + message.guild.id)) {
            db.set("seviyesistem." + message.guild.id, "açık")
            const embed = new Discord.MessageEmbed()
                .setTitle("Seviye Sistemi Açıldı")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                .setDescription("Seviye Sistemi Başarıyla `Açık` Durumuna Getirildi!")
                .setColor("GREEN")
            message.channel.send(embed)
        } else {
            message.channel.send("Seviye Sistemi Zaten Açık!")
        }
    }

    if (args[0] == "kapat") {
        if (db.has("seviyesistem." + message.guild.id)) {
            db.delete("seviyesistem." + message.guild.id)
            if(db.has("seviyelogkanal." + message.guild.id)) {
                db.delete("seviyelogkanal." + message.guild.id)
            }
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle("Seviye Sistemi Kapatıldı")
                .setDescription("Seviye Sistemi Başarıyla `Kapalı` Durumuna Getirildi!")
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
            message.channel.send(embed)
        } else {
            message.channel.send("Seviye Sistemi Zaten Kapalı!")
        }
    }

    if (args[0] == "kanal") {

        let kanal = message.mentions.channels.first();

        if (db.has("seviyesistem." + message.guild.id)) {
            if(kanal) {
                db.set("seviyelogkanal." + message.guild.id, kanal.id)
                const embed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Seviye Sistemi Kanalı Ayarlandı")
                    .setDescription("Seviye Sistemi Log Kanalı Başaıryla <#" + kanal + "> Olarak Ayarlandı!")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                message.channel.send(embed)
            } else {
                message.channel.send("Seviye Log Kanalı Giriniz!")
            }
        } else {
            message.channel.send("Seviye Sistemini Açınız `e!seviye aç`")
        }
    }

    if (args[0] == "xpayar") {

        let xpayar = parseInt(args[1])

        if (db.has("seviyesistem." + message.guild.id)) {
            if(xpayar) {
                db.set("xpverilcek." + message.guild.id, xpayar)

                const embed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Seviye Sistemi Verilcek XP Ayarlandı")
                    .setDescription("Seviye Sistemi Verilcek XP Başaıryla `" + xpayar + "` Olarak Ayarlandı!")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                message.channel.send(embed)
            } else {
                message.channel.send("Mesaj Başı Verilcek XP Girmediniz!")

            }

        } else {
            message.channel.send("Seviye Sistemini Açınız `e!seviye aç`")
        }
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["level"],
    permLevel: 0
};

exports.help = {
    name: 'seviye',
    description: 'Seviye Sistemi!.',
    usage: 'sevite'
};