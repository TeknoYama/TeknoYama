const Discord = require("discord.js"),
    db = require("wio.db"),
    ayarlar = require("../../ayarlar.json")

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu Komutu Kullanabilmek için `Yönetici` Yetkisine Sahip Olmalısın!");
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bu Komutu Kullanabilmek için `Rolleri Yönet` Yetkisine Sahip Olmalıyım")

    let kanal = message.mentions.channels.first()

    let rol = message.mentions.roles.first()


    if(args[0] == "kanal") {
        if(kanal) {

            db.set("kayıtkanal." + message.guild.id, kanal.id)

            const embed = new Discord.MessageEmbed()
                .setTitle("Kayıt Kanalı Ayarlandı!")
                .setDescription("Kayıt Kanalı Başarıyla <#" + kanal.id + "> Olarak Ayarlandı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)

        } else {
            message.channel.send("Bir Kayıt Kanal'ı Etiketleyiniz!")
        }
    }

    if(args[0] == "yetkili") {
        if (rol) {
            if (message.member.roles.highest.position >= rol.position || message.guild.owner) {
                if (message.guild.me.roles.highest.position <= rol.position) return message.channel.send(`Olamaz! Bu Rol Benim Rolümden Yukarıda!`);
                db.set("kayıtyetkili." + message.guild.id, rol.id)

                const embed = new Discord.MessageEmbed()
                    .setTitle("Kayıt Yetkili Rolü Ayarlandı!")
                    .setDescription("Kayıt Yetkili Rolü Başarıyla <@&" + rol.id + "> Olarak Ayarlandı!")
                    .setFooter(ayarlar.footer)
                    .setColor("GREEN")
                    .setTimestamp()
                message.channel.send(embed)

            } else {
                message.channel.send(`Bu Rolü Ayarlayabilmen için Rolün ${rol.name} Rolünün Üstünde Olması Gerekir!`);
            }
        } else {
            message.channel.send("Bir Kayıt Yetkili Rol'ü Etiketleyiniz!")
        }
    }

    if(args[0] == "erkekrol") {
        if(rol) {
            db.set("kayıterkekrol." + message.guild.id, rol.id)

            const embed = new Discord.MessageEmbed()
                .setTitle("Kayıt Erkek Rolü Ayarlandı!")
                .setDescription("Kayıt Erkek Rolü Başarıyla <@&" + rol.id + "> Olarak Ayarlandı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)


        } else {
            message.channel.send("Bir Erkek Rol'ü Etiketleyiniz!")
        }
    }

    if(args[0] == "bayanrol") {
        if(rol) {
            db.set("kayıtbayanrol." + message.guild.id, rol.id)

            const embed = new Discord.MessageEmbed()
                .setTitle("Kayıt Bayan Rolü Ayarlandı!")
                .setDescription("Kayıt Bayan Rolü Başarıyla <@&" + rol.id + "> Olarak Ayarlandı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)


        } else {
            message.channel.send("Bir Bayan Rol'ü Etiketleyiniz!")
        }
    }

    if(args[0] == "tag") {
        if(args[1]) {

            db.set("kayıttag." + message.guild.id, args[1])

            const embed = new Discord.MessageEmbed()
                .setTitle("Kayıt Tagı Ayarlandı!")
                .setDescription("Kayıt Tagı Başarıyla " + args[1] + " Olarak Ayarlandı!")
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
                .setTimestamp()
            message.channel.send(embed)

        } else {
            message.channel.send("Bir Kayıt Tag'ı Giriniz!")
        }
    }

    if(args[0] == "sıfırla") {

        if(db.has("kayıttag." + message.guild.id)) {
            db.delete("kayıttag." + message.guild.id)
        }
        if(db.has("kayıtbayanrol." + message.guild.id)) {
            db.delete("kayıtbayanrol." + message.guild.id)
        }
        if(db.has("kayıterkekrol." + message.guild.id)) {
            db.delete("kayıterkekrol." + message.guild.id)
        }
        if(db.has("kayıtyetkili." + message.guild.id)) {
            db.delete("kayıtyetkili." + message.guild.id)
        }
        if(db.has("kayıtkanal." + message.guild.id)) {
            db.delete("kayıtkanal." + message.guild.id)
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Kayıt Sistemi Sıfırlandı!")
            .setDescription("Kayıt Sistemi Başarıyla Sıfırlandı!")
            .setFooter(ayarlar.footer)
            .setColor("GREEN")
            .setTimestamp()
        message.channel.send(embed)

    }

    if(!args[0]) {

        const embed = new Discord.MessageEmbed()
            .setTitle(ayarlar.isim+" Kayıt Komutları")
            .setDescription("Kayıt Örnek Komut: e!kayıt tag\n")
            .addField("Kayıt", "**e!kayıt tag [tag]** -> Kayıt Edince Verilcek TAG ayarlar.\n**e!kayıt yetkili [@rol]** -> Kayıt Yetkilisi Rolünü Ayarlar.\n**e!kayıt bayanrol [@rol]** -> Bayan Rolününü ayarlar.\n**e!kayıt erkekrol [@rol]** -> Erkek Rolününü ayarlar.\n**e!kayıt kanal [#kanal]** -> Kayıt Kanalını ayarlar.\n**e!kayıt sıfırla** -> Kayıt Sistemini kapatır.")
            .setColor("GREEN")
            .setTimestamp()
        message.channel.send(embed)

    }


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kayıt"],
    permLevel: 0
};

exports.help = {
    name: 'register',
    description: 'Kayıt Sistemi!.',
    usage: 'kayıt'
};