const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async(client, message, args) => {

    let rol = message.mentions.roles.first()

    if(!message.member.hasPermission("MANAGE_ROLES")) if(db.fetch("dil." + message.guild.id) == "EN") return message.channel.send(messages.ingilizce.manage-roles)
    if(!message.member.hasPermission("MANAGE_ROLES")) if(!db.fetch("dil." + message.guild.id)) return message.channel.send(messages.türkçe.rolleri-yonet)
  
    let kanal = message.mentions.channels.first() || message.guild.channels.cache.find(c=>c.name===args.slice(0).join(' '))


    if (args[0] == "ayarla" || args[0] == "set") {
        if (rol) {
            if (message.member.roles.highest.position >= rol.position || message.guild.owner) {
                if (message.guild.me.roles.highest.position <= rol.position) return message.channel.send(`Olamaz! Bu Rol Benim Rolümden Yukarıda!`);
                db.set(`otorol.${message.guild.id}`, rol.id)
                if(db.has("dil." + message.guild.id)) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Succes!")
                    .setDescription("Autorole Role has ben setted to <@&" + rol + ">")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Otorol Ayarlandı")
                    .setDescription("Otorol Rolü <@&" + rol + "> Olarak ayarlandı!")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)
                }
            } else {
                if(db.has("dil." + message.guild.id)) {
                    return message.channel.send(`Your Role must be above ${role.name} to Set this Role!`);
                }else {
                    return message.channel.send(`Bu Rolü Ayarlayabilmen için Rolün ${rol.name} Rolünün Üstünde Olması Gerekir!`);
                }
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("You must mention a autorole Role.")
            }else{
                message.channel.send("Bir Otorol rolü Etiketle")
            }
        }
    }

    if (args[0] == "kanal" || args[0] == "channel") {
        if (db.fetch(`otorol.${message.guild.id}`)) {
            if (kanal) {
                db.set(`otorolkanal.${message.guild.id}`, kanal.id)
                if(db.has("dil." + message.guild.id)) {

                    const embed = new Discord.MessageEmbed()
                    .setTitle("Succes")
                    .setDescription("Autorole Log Channel has been setted to <#" + kanal + ">")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Otorol Kanalı Ayarlandı")
                    .setDescription("Otorol Kanalı <#" + kanal + "> Olarak ayarlandı!")
                    .setColor("GREEN")
                    .setFooter(ayarlar.footer)
                    .setTimestamp()
                    message.channel.send(embed)
                }
            } else {
                if(db.has("dil." + message.guild.id)) {
                    message.channel.send("Please, mention a Autorole Log Channel!")
                } else {
                    message.channel.send("Log Kanalını Etiketle!")
                }
            }

        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("You must be set the Autorole first Usage: `e!autorole set @role`!")
            } else {
                message.channel.send("Otorol'u ayarlamalısın Kullanım: `e!otorol ayarla @rol`!")
            }
        }
    }

    if (args[0] == "kapat" || args[0] == "close") {
        if (db.has(`otorol.${message.guild.id}`)) {
            db.delete(`otorol.${message.guild.id}`)
            if(db.has("dil." + message.guild.id)) {
                const embed = new Discord.MessageEmbed()
                .setTitle("Succes!")
                .setColor("GREEN")
                .setDescription("Autorole function is closed by <@" + message.member + ">")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(embed)
            }else{
                const embed = new Discord.MessageEmbed()
                .setTitle("Otorol Kapatıldı")
                .setColor("GREEN")
                .setDescription("Otorol Başarıyla <@" + message.member + "> Tarafından Kapatıldı!")
                .setFooter(ayarlar.footer)
                .setTimestamp()
                message.channel.send(embed)
            }
            if (db.has(`otorolkanal.${message.guild.id}`)) {
                db.delete(`otorolkanal.${message.guild.id}`)
            }
            if (db.has(`otorolmesaj.${message.guild.id}`)) {
                db.delete(`otorolmesaj.${message.guild.id}`)
            }
        } else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("Can't close the Autorole because it's not set!")
            }else{
                message.channel.send("Otorol'u Kapatamassın Çünkü Ayarlanmamış!")
            }
        }
    }

    if (args[0] == "mesaj" || args[0] == "message") {
        if(db.has(`otorol.${message.guild.id}`)) {
            if (db.has(`otorolkanal.${message.guild.id}`)) {
                if (args[1]) {

                    const mesaj = args.slice(1).join(' ');

                    if(db.has("dil." + message.guild.id)) {

                        const embed = new Discord.MessageEmbed()
                        .setTitle("Succes!")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Autorole Message has been setted to `" + mesaj + "`")
                        message.channel.send(embed)
                        db.set(`otorolmesaj.${message.guild.id}`, mesaj)

                    }else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Otorol Mesajı")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Otorol Mesajı `" + mesaj + "`  Olarak ayarlandı")
                        message.channel.send(embed)
                        db.set(`otorolmesaj.${message.guild.id}`, mesaj)
                    }

                } else {
                    if(db.has("dil." + message.guild.id)) {

                        const embed = new Discord.MessageEmbed()
                        .setTitle("Succes")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Autorole Message Variables:\n-toplam- Says the Member Count of the server\n-uye- Says the Joined member\n-rol- Says the role")
                        message.channel.send(embed)

                    } else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle("Otorol Mesajı")
                        .setColor("GREEN")
                        .setFooter(ayarlar.footer)
                        .setDescription("Otorol Mesaj Değişkenleri:\n-toplam- Toplam Üye Sayısı\n-üye- Giren Üye\n-rol- Rol")
                        message.channel.send(embed)
                    }
                }

            } else {
                if(db.has("dil." + message.guild.id)) {
                    message.channel.send("You must be set the Autorole Log channel first Usage: `e!autorole channel @role`")
                } else {
                    message.channel.send("Lütfen ilk Önce Otorol Kanalını Ayarlayın: `e!otorol kanal #kanal`")
                }
            }
        }else {
            if(db.has("dil." + message.guild.id)) {
                message.channel.send("You must be set the Autorole Log channel first Usage: `e!autorole channel @role`")
            } else {
                message.channel.send("Lütfen ilk Önce Otorol Rolünü Ayarlayın: e!otorol ayarla @rol")
            }
        }
    }

    if (!args[0]) {
        if(db.has("dil." + message.guild.id)) {

            const embed = new Discord.MessageEmbed()
            .setTitle("Autorole")
            .setDescription("Setting UP the Autorole\n**e!autorole set [@role]** -> Sets the autorole role.\n**e!autorole channel [#channel]** -> Sets the Autorole Log channel.\n**e!autorole message [message]** -> Sets the Autorole message.\n**e!autorole close** -> Close the Autorole.")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
            message.channel.send(embed)

        }else {
            const embed = new Discord.MessageEmbed()
            .setTitle("Otorol Ayarları!")
            .setDescription("Otorol Ayarlamak için\n**e!otorol ayarla [@rol]** -> Otorol Rolünü ayarlar.\n**e!otorol kanal [#kanal]** -> Otorol Log Kanalını ayarlar.\n**e!otorol mesaj [mesaj]** -> Otorol Mesajını ayarlar.\ne**!otorol kapat** -> Otorol kapatır.")
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
    aliases: ["autorole"],
    permLevel: 0
};

exports.help = {
    name: 'otorol',
    description: 'Otorol.',
    usage: 'otorol [@rol]'
};