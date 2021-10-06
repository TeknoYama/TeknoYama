const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async (client, message, args) => {
    if(db.has("dil." + message.guild.id)) {

        const embed = new Discord.MessageEmbed()
        .setTitle(ayarlar.isim + " Help")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setDescription("Sample Command: e!sayaç")
        .addField("Moderasyon", "**e!counter** -> Counter System.\n**e!autorole]** -> Autorole system.\n**e!join-leave** -> Join Leave System.\n**e!clear** -> Clears messages.\n**e!auto-hello-response** -> Sets the auto-hello-response.\n**e!giveaway** -> Starts a giveaway.\n**e!end** -> Ends a giveaway.\n**e!reroll** -> Rerolls a giveaway.")
        .setTimestamp()
        message.channel.send(embed)

    }else {
        const embed = new Discord.MessageEmbed()
        .setTitle(ayarlar.isim + " Yardım")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setDescription("Örnek Komut: e!sayaç")
        .addField("Moderasyon", "**e!sayaç ayarla [sayı] [#kanal]** -> Sayaç Sistemini aktifleştirir.\n**e!otorol ayarla [@rol] | e!otorol kanal [#kanal]** -> Otorol sistemini aktifleştirir.\n**e!giriş-çıkış ayarla [#kanal]** -> Giriş Çıkış sistemini aktifleştirir.\n**e!sil [sayı]** -> Belirli miktarda mesaj siler.\n**e!sa-as aç** -> SA-AS Sistemini Açar.\n**e!çekiliş [süre] [#kanal] [kazanan sayısı] [Ödül]** -> Çekiliş başlatır.\n**e!end [çekiliş mesaj id]** -> Girilen IDli Çekilişi Sonuçlar.\n**e!reroll [çekiliş mesaj id]** -> Girilen IDli Çekilişi Tekrarlar.")
        .setTimestamp()
        message.channel.send(embed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["moderation", "mod"],
    permLevel: 0
};

exports.help = {
    name: 'moderasyon',
    description: 'moderasyon.',
    usage: 'moderasyon'
};