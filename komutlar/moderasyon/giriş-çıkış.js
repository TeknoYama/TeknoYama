const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) if(db.fetch("dil." + message.guild.id) == "EN") return message.channel.send(messages.ingilizce.administrator)
    if(!message.member.hasPermission("ADMINISTRATOR")) if(!db.fetch("dil." + message.guild.id)) return message.channel.send(messages.türkçe.administrator)
    let kanal = message.mentions.channels.first() || message.guild.channels.cache.find(c=>c.name===args.slice(1).join(' '))

    if(!args[0]) {
        if(!db.has("dil." + message.guild.id)) {
            const embed = new Discord.MessageEmbed()
            .setTitle("Giriş Çıkış Ayarlama")
            .setDescription("Giriş Çıkış Ayarlamak için:\ne!giriş-çıkış ayarla #kanal\ne!giriş-çıkış kapat")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            message.channel.send(embed)
        } else {
            const tembed = new Discord.MessageEmbed()
            .setTitle("Join Leave Setting UP")
            .setDescription("Setting Join Leave UP:\ne!join-leave set #channel\ne!join-leave close")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            message.channel.send(tembed)
        }
    }

    if (args[0] == "ayarla" || args[0] == "set") {
        if (kanal) {
            db.set(`giriş_çıkışkanal.${message.guild.id}`, kanal.id)
            if(db.has("dil." + message.guild.id)) {
                const embed = new Discord.MessageEmbed()
                .setTitle("Succes!")
                .setDescription("Join Leave Channel is setted to <#" + kanal + ">")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                .setColor("GREEN")
                message.channel.send(embed)

            } else {
                const tembed = new Discord.MessageEmbed()
                .setTitle("Giriş Çıkış Ayarlandı")
                .setDescription("Giriş Çıkış Kanalı <#" + kanal + "> Olarak Ayarlandı!")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                .setColor("GREEN")
                message.channel.send(tembed)
            }
        }
    }

    if (args[0] == "kapat" || args[0] == "close") {
        if (db.has(`giriş_çıkışkanal.${message.guild.id}`)) {
            db.delete(`giriş_çıkışkanal.${message.guild.id}`)
            if(db.has("dil." + message.guild.id)) {

                const embed = new Discord.MessageEmbed()
                .setTitle("Succes")
                .setColor("GREEN")
                .setDescription("Join Leave function is closed by <@"+message.member.id+">")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(embed)
                
            } else {
                const tembed = new Discord.MessageEmbed()
                .setTitle("Giriş Çıkış Kapatıldı")
                .setColor("GREEN")
                .setDescription("Giriş Çıkış Başarıyla <@" + message.member + "> Tarafından Kapatıldı!")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(tembed)
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("Can't close the Join Leave because it's not set!")
            } else {
                message.channel.send("Giriş Çıkış Sistemini Kapayamassın çünkü zaten Kapalı!")
            }
        }
    }


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gc", "leave-join", "join-leave"],
    permLevel: 0
};

exports.help = {
    name: 'giriş-çıkış',
    description: 'Giriş Çıkış.',
    usage: 'Giriş Çıkış [#Kanal]'
};