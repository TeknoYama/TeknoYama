const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async(client, message, args) => {

    let ayarlanmamis;
    if(db.has(`dil.${message.guild.id}`)) {
        ayarlanmamis = "Not Setted"
    } else {
        ayarlanmamis = "Ayarlanmamış"
    }

    let acik;
    if(db.has(`dil.${message.guild.id}`)) {
        acik = "Setted"
    } else {
        acik = "Açık"
    }
    
    let kapali;
    if(db.has(`dil.${message.guild.id}`)) {
        kapali = "Not Setted"
    } else {
        kapali = "Kapalı"
    }

    let sayaçsayi = db.fetch(`sayaçsayı.${message.guild.id}`) || ayarlanmamis
    let sayaçkanal = message.guild.channels.cache.get(db.fetch(`sayaçkanal.${message.guild.id}`)) || ayarlanmamis
    let seviyelogkanal = message.guild.channels.cache.get(db.fetch(`seviyelogkanal.${message.guild.id}`)) || ayarlanmamis
    let otorolkanal = message.guild.channels.cache.get(db.fetch(`otorolkanal.${message.guild.id}`)) || ayarlanmamis
    let davetkanal = message.guild.channels.cache.get(db.fetch(`davetkanal.${message.guild.id}`)) || ayarlanmamis
    let otorol = message.guild.roles.cache.get(db.fetch(`otorol.${message.guild.id}`)) || ayarlanmamis
    let kayıtyetkili = message.guild.roles.cache.get(db.fetch(`kayıtyetkili.${message.guild.id}`)) || ayarlanmamis
    let kayıterkekrol = message.guild.roles.cache.get(db.fetch(`kayıterkekrol.${message.guild.id}`)) || ayarlanmamis
    let kayıtbayanrol = message.guild.roles.cache.get(db.fetch(`kayıtbayanrol.${message.guild.id}`)) || ayarlanmamis
    let kayıtkanal = message.guild.channels.cache.get(db.fetch(`kayıtkanal.${message.guild.id}`)) || ayarlanmamis
    let destekkanal = message.guild.channels.cache.get(db.fetch(`ticket-kanal.${message.guild.id}`)) || ayarlanmamis
    let destekyetkili = message.guild.roles.cache.get(db.fetch(`ticket-yetkilirol.${message.guild.id}`)) || ayarlanmamis

    let küfür;
    if(db.has(`kufurengel.${message.guild.id}`)) {
        küfür = acik
    } else {
        küfür = kapali
    }
    let rolkoruma;
    if(db.has(`rolsilmekoruması.${message.guild.id}`)) {
        rolkoruma = acik
    } else {
        rolkoruma = kapali
    }
    let kanalkoruma;
    if(db.has(`kanalsilmekoruması.${message.guild.id}`)) {
        kanalkoruma = acik
    } else {
        kanalkoruma = kapali
    }
    let seviyesistem;
    if(db.has(`seviyesistem.${message.guild.id}`)) {
        seviyesistem = acik
    } else {
        seviyesistem = kapali
    }
    let saas;
    if(db.has(`saassistem.${message.guild.id}`)) {
        saas = acik
    } else {
        saas = kapali
    }
    let gc = message.guild.channels.cache.get(db.fetch(`giriş_çıkışkanal.${message.guild.id}`)) || ayarlanmamis

    if(db.has(`dil.${message.guild.id}`)) {
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name + " Server Settings <a:ayar:800004605358374923>")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setTimestamp()
        .addField("Ticket Channel", sayaçkanal, true)
        .addField("Counter NUmber", sayaçsayi, true)
        .addField("Autorole Log Channel", otorolkanal, true)
        .addField("Autorole Role", otorol, true)
        .addField("Anti Swear Protection", küfür, true)
        .addField("Delete Role Protection", rolkoruma, true)
        .addField("Delete Channel Protection", kanalkoruma, true)
        .addField("Join Leave", gc, true)
        .addField("Auto Hello Response", saas, true)
        .addField("InviteCounter Channel", davetkanal, true)
        .addField("Level System", seviyesistem, true)
        .addField("Level Log Channel", seviyelogkanal, true)
        .addField("Register Channel", kayıtkanal, true)
        .addField("Register Authority", kayıtyetkili, true)
        .addField("Register Boy Role", kayıterkekrol, true)
        .addField("Register Girl Rol", kayıtbayanrol, true)
        .addField("TicketTool Channel", destekkanal, true)
        .addField("TicketTool Authority Role", destekyetkili, true)
        message.channel.send(embed)

    }else {
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name + " Sunucu Ayarları <a:ayar:800004605358374923>")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setTimestamp()
        .addField("Sayaç Kanal", sayaçkanal, true)
        .addField("Sayaç Sayı", sayaçsayi, true)
        .addField("Otorol Kanal", otorolkanal, true)
        .addField("Otorol", otorol, true)
        .addField("Küfür Koruması", küfür, true)
        .addField("Rol Koruması", rolkoruma, true)
        .addField("Kanal Koruması", kanalkoruma, true)
        .addField("Giriş Çıkış", gc, true)
        .addField("SA - AS Sistemi", saas, true)
        .addField("Davet Sistemi", davetkanal, true)
        .addField("Seviye Sistemi", seviyesistem, true)
        .addField("Seviye Kanal", seviyelogkanal, true)
        .addField("Kayıt Kanal", kayıtkanal, true)
        .addField("Kayıt Yetkili", kayıtyetkili, true)
        .addField("Kayıt Erkek Rol", kayıterkekrol, true)
        .addField("Kayıt Bayan Rol", kayıtbayanrol, true)
        .addField("Destek Sistemi", destekkanal, true)
        .addField("Destek Yetkili Rolü", destekyetkili, true)
        message.channel.send(embed)
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ayarlar", "settings"],
    permLevel: 0
};

exports.help = {
    name: 'settings',
    description: 'sayaç.',
    usage: 'sayaç ayarla [sayı]'
};