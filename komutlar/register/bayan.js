const Discord = require("discord.js"),
    db = require("wio.db"),
    ayarlar = require("../../ayarlar.json")

exports.run = async (client, message, args, tools) => {

    let kişi;
    if (message.mentions.members.first()) {
        kişi = message.mentions.members.first();
    }

    let yetkilirol = db.fetch("kayıtyetkili." + message.guild.id)
    let kanal = message.guild.channels.cache.get(db.fetch("kayıtkanal." + message.guild.id))
    let rol = db.fetch("kayıtbayanrol." + message.guild.id)
    let tag = db.fetch("kayıttag." + message.guild.id)


    if (!kanal) return message.channel.send("Kayıt Kanalı Ayarlanmamış!")

    if (!message.member.roles.cache.has(yetkilirol)) return message.channel.send("Bu Komutu Kullanabilmek için <@&" + yetkilirol + "> Rolüne Sahip Olman Gerekli!");

    if (message.channel.id == kanal.id) {
        if (rol) {

            kişi.roles.add(rol)

            const embed = new Discord.MessageEmbed()
                .setTitle("Kayıt Başarılı!")
                .addField("Kayıt Eden Yetkili:", message.author.username, true)
                .addField("Kayıt Edilen:", "<@" + kişi + ">", true)
                .addField("Verilen Rol:", "<@&" + rol + ">", true)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)

            if(tag) {
                kişi.setNickname(tag + " " + kişi.displayName)
            }


        } else {
            message.channel.send("Bayan Rolü Ayarlanmamış!")
        }
    } else {
        message.channek.send("Bu Komutu Sadece Kayıt Kanalında Kullanabilirsin!")
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kayıt-bayan", "k", "b", "kız"],
    permLevel: 0
};

exports.help = {
    name: 'bayan',
    description: 'Kayıt Sistemi!.',
    usage: 'kayıt'
};