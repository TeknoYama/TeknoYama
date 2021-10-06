const db = require("wio.db")
const Discord = require("discord.js")
const ayarlar = require("../../ayarlar.json")

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu Komutu Kullanabilmek için `Sunucuyu Yönet` Yetkisine Sahip Olmalısın!");

    if(args[0] == "aç" || args[0] == "open") {

        if (!db.has("saassistem." + message.guild.id)) {
            db.set("saassistem." + message.guild.id, "açık")
            if(db.has("dil." + message.guild.id)) {

                const embed = new Discord.MessageEmbed()
                .setTitle("Succes!")
                .setDescription("Auto Hello Response system is Opened")
                .setTimestamp()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                message.channel.send(embed)

            } else {
                const embed = new Discord.MessageEmbed()
                .setTitle("SA-AS Sistemi Açıldı")
                .setDescription("SA-AS Sistemi Başarıyla `Açık` Haline Getirildi!")
                .setTimestamp()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                message.channel.send(embed)
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("Auto Hello Response system is already open!")
            }else {
                message.channel.send("SA-AS Sistemi Zaten Açık!")
            }
        }

    }

    if(!args[0]) {
        if(db.has("dil." + message.guild.id)) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Auto Hello Response")
            .setDescription("Auto Hello Response setup:\n**e!auto-hello-response open** -> Open the Auto Hello Responser.\n**e!auto-hello-response close** -> Close the Auto Hello Response.")
            .setTimestamp()
            .setColor("GREEN")
            .setFooter(ayarlar.footer)
            message.channel.send(embed)

        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle("SA-AS Ayarları")
            .setDescription("SA AS Ayarlamak için:\n**e!sa-as aç** -> SA-AS Sistemini açar.\n**e!sa-as kapat** -> SA-AS Sistemini kapatır.")
            .setTimestamp()
            .setColor("GREEN")
            .setFooter(ayarlar.footer)
            message.channel.send(embed)
        }

    }

    if(args[0] == "kapat" || args[0] == "close") {

        if (db.has("saassistem." + message.guild.id)) {
            db.delete("saassistem." + message.guild.id)
            if(db.has("dil." + message.guild.id)) {
                const embed = new Discord.MessageEmbed()
                .setTitle("Succes")
                .setDescription("Auto Response System is closed")
                .setTimestamp()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                message.channel.send(embed)

            }else {
                const embed = new Discord.MessageEmbed()
                .setTitle("SA-AS Sistemi Kapatıldı")
                .setDescription("SA-AS Sistemi Başarıyla `Kapalı` Haline Getirildi!")
                .setTimestamp()
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
                message.channel.send(embed)
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("Auto Hello Response system is already closed!")
            }else {
                message.channel.send("SA-AS Sistemi Zaten Kapalı!")
            }
        }

    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sa-as", "saas", "auto-hello-response"],
    permLevel: 0
};

exports.help = {
    name: "seaase"
};