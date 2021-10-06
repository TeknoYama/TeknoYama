const Discord = require('discord.js');
const db = require("wio.db")
const ayarlar = require("../../ayarlar.json")

exports.run = async(client, message, args) => {

    let puan = db.fetch("puan." + message.member.id) || 0

    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor("GREEN")
            .setFooter(ayarlar.footer)
            .setTitle("Puan Market")
            .setDescription("Günlük Puan Ödülünü Almayı unutma: !günlük-puan\nÖrnek Market Kodu: !puanmarket (ürün id)\nHesabınızadaki Puan Miktarı: " + puan)
            .addField("Ürünler:", "Sınırsız Premium 10k Puan ID: 1")
        message.channel.send(embed)
    }

    if(args[0] == "1") {
        if(puan >= 10000) {
            db.add("puan." + message.member.id, -10000)
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                .setTitle("Başarılı")
                .setDescription("Premium Özelliği Hesabınıza Tanımlandı\nÖzellikleri:\nSunuculara Katıldınızda Özel Mesaj (Bir Premium Üye Sunucuya Katıldı Gibisinden)")
            message.channel.send(embed)
            db.set("premium." + message.member.id, "aktif")
        } else {
            message.reply("Malesef Yeterli Puanınız Bulunmamaktadır")
        }
    }
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["puanmarket"],
    permLevel: 0,
};

exports.help = {
    name: 'puanshop',
    description: 'Oy Verince çalışan Komut',
    usage: 'Oy Verince çalışan Komut',
};