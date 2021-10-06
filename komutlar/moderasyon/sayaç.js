const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) if(db.fetch("dil." + message.guild.id) == "EN") return message.channel.send(messages.ingilizce.administrator)
    if(!message.member.hasPermission("ADMINISTRATOR")) if(!db.fetch("dil." + message.guild.id)) return message.channel.send(messages.türkçe.administrator)

    let kanal = message.mentions.channels.first() || message.guild.channels.cache.find(c=>c.name===args.slice(0).join(' '))
    let sayı = parseInt(args[1])
    if (sayı <= message.guild.memberCount) {
        if(db.has("dil." + message.guild.id)) {
            message.channel.send("Enter a number under the number of members!")
        }else {
            message.channel.send("Üye sayısının altına bir rakam giriniz!")
        }
    }


    if (args[0] == "mesaj" || args[0] == "message") {
        if(db.has(`sayaçsayı.${message.guild.id}`)) {
            if (db.has(`sayaçkanal.${message.guild.id}`)) {
                if (args[1]) {

                    const mesaj = args.slice(1).join(' ');

                    if(db.has("dil." + message.guild.id)) {

                        const embed = new Discord.MessageEmbed()
                        .setTitle("Succes")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Counter message is setted to `" + mesaj + "`")
                        message.channel.send(embed)

                    }else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Otorol Mesajı")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Sayaç Mesajı `" + mesaj + "` Olarak ayarlandı")
                        message.channel.send(embed)
                    }
                    db.set(`sayaçmesaj.${message.guild.id}`, mesaj)

                } else {
                    if(db.has("dil." + message.guild.id)) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Otorol Mesajı")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Counter variables:\n-toplam- Members on guild\n-üye- Joined Member\n-kalan- Number of Persons Remaining")
                        message.channel.send(embed)
                    }else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Otorol Mesajı")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Sayaç Mesaj Değişkenleri:\n-toplam- Toplam Üye Sayısı\n-üye- Giren Üye\n-kalan- Kalan Kişi Sayısı")
                        message.channel.send(embed)
                    }
                }

            }
        }
    }

    if (args[0] == "ayarla" || args[0] == "set") {
        if (sayı) {
            if (kanal) {
                db.set(`sayaçsayı.${message.guild.id}`, sayı)
                db.set(`sayaçkanal.${message.guild.id}`, kanal.id)
                if(db.has("dil." + message.guild.id)) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Succes!")
                    .setDescription("Counter number: " + sayı + "\nCounter Channel: <#" + kanal + ">")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)

                }else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Sayaç Ayarlandı")
                    .setDescription("Sayaç Sayısı " + sayı + "\nSayaç Kanalı: <#" + kanal + ">")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)
                }
            } else {
                if(db.has("dil." + message.guild.id)) {
                    message.channel.send("Please mention a counter log channel!")
                }else {
                    message.channel.send("Lütfen Sayaç Log kanalını etiketleyiniz!")
                }
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("Please, give a counter number!")
            }else {
                message.channel.send("Lütfen Sayaç sayısını giriniz!")
            }        
        }
    }

    if (args[0] == "kapat" || args[0] == "close") {
        if (db.has(`sayaçsayı.${message.guild.id}`)) {
            db.delete(`sayaçsayı.${message.guild.id}`)
            db.delete(`sayaçkanal.${message.guild.id}`)
            if(db.has("dil." + message.guild.id)) {

                const embed = new Discord.MessageEmbed()
                .setTitle("Succes")
                .setColor("GREEN")
                .setDescription("Counter is closed by <@" + message.member + ">")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(embed)

            } else {
                const embed = new Discord.MessageEmbed()
                .setTitle("Sayaç Kapatıldı")
                .setColor("GREEN")
                .setDescription("Sayaç Başarıyla <@" + message.member + "> Tarafından Kapatıldı!")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(embed)
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("You can't close this because it's already closed!")
            }else {
                message.channel.send("Sayaç Zaten Kapalı!")
            } 
        }
    }



    if (!args[0]) {
        if(db.has("dil." + message.guild.id)) {

            const embed = new Discord.MessageEmbed()
            .setTitle("Counter Setup!")
            .setDescription("Counter Setup\n**e!counter set [number] [#channel]** -> Sets the counter.\n**e!counter message [message]** -> Sets the counter message.")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
            message.channel.send(embed)

        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle("Sayaç Ayarları!")
            .setDescription("Sayaç Ayarlamak için\n**e!sayaç ayarla [sayı] [#kanal]** -> Sayaç Sistemini ayarlar.\n**e!sayaç mesaj [mesaj]** -> Sayaç Sisteminin mesajını ayarlar.")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
            message.channel.send(embed)
        }
    }




}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["counter"],
    permLevel: 0
};

exports.help = {
    name: 'sayaç',
    description: 'sayaç.',
    usage: 'sayaç ayarla [sayı]'
};