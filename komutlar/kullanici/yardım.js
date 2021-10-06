const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async (client, message, args) => {

    if(db.has("dil." + message.guild.id)) {
        const embed = new Discord.MessageEmbed()
        .setTitle(ayarlar.isim+" Help")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setDescription("Sample Command: e!autorole\n\nCommand Size " + client.commands.size +"\n")
        .addField("User Commands", "User Commands for your server\ne!avatar, e!sponsor, e!ping, e!settings, e!istatistik")
        .addField("e!moderation", "Moderation commands for your server\ne!autorole, e!counter, e!join-leave, e!clear, e!auto-hello-response, e!giveaway, e!reroll, e!end")
        .addField("e!invitecounter", "Invite Counter commands for your server\ne!invitecounter kanal, e!davet kapat ,e!davetlerim, e!top10")
        .addField("e!level", "Level Commands for your server\ne!level setxp, e!level channel, e!level close, e!level open, e!rank, e!top10")
        .addField("e!ticket", "Ticket Tool system for your server\ne!ticket channel, e!ticket close")
        .setTimestamp()
        message.channel.send(embed)
    }else{
        const embed = new Discord.MessageEmbed()
        .setTitle(ayarlar.isim+" Yardım")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setDescription("Örnek Komut: e!küfür\n\nKomut Sayısı " + client.commands.size +"\n")
        .addField("Kullanıcı", "Sunucunuz için Kullanıcı Sistemi\ne!avatar, e!sponsor, e!ping, e!ayarlar, e!istatistik")
        .addField("e!moderasyon", "Sunucunuz için Moderasyon Sistemi\ne!otorol, e!sayaç, e!giriş-çıkış, e!sil, e!sa-as, e!çekiliş, e!reroll, e!end")
        .addField("e!koruma", "Sunucunuz için Koruma Sistemleri\ne!küfür, e!kanal-silme-koruma, e!rol-silme-koruma")
        .addField("e!davet", "Sunucunuz için Davet Sistemi\ne!davet kanal, e!davet kapat ,e!davetlerim, e!top10")
        .addField("e!seviye", "Sunucunuz için Seviye Sistemi\ne!seviye xpayar, e!seviye kanal, e!seviye kapat, e!seviye aç, e!rank, e!top10")
        .addField("e!destek", "Sunucunuz için Destek Sistemi\ne!destek kanal, e!destek kapat")
        .setTimestamp()
        message.channel.send(embed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["help"],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
    description: 'yardım.',
    usage: 'yardım'
};