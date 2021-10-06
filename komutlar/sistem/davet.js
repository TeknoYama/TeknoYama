const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const db = require("wio.db")
//

exports.run = (client, message, args) => {

  let kanal = message.mentions.channels.first();
  let kişi = message.mentions.members.first();
  let arg = args[0]

  if(arg == "kanal") {
    if(kanal) {

      db.set(`davetkanal.${message.guild.id}`, kanal.id)

      const embed = new Discord.MessageEmbed()
        .setTitle("Davet Kanalı Başarıyla Ayarlandı.")
        .setDescription("Davet Kanalı Başarıyla <#" + kanal.id + "> olarak ayarlandı.")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setTimestamp()
      message.channel.send(embed)
    }
  }

  if(arg == "kapat") {
    if(db.has(`davetkanal.${message.guild.id}`)) {
      db.delete(`davetkanal.${message.guild.id}`)
      const embed = new Discord.MessageEmbed()
        .setTitle("Davet Sistemi Kapatıldı.")
        .setDescription("Davet Sistemi Başarıyla <@" + message.author.id + "> tarafından kapatıldı.")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setTimestamp()
      message.channel.send(embed)
    }else{
      message.channel.send("Davet Sistemi Zaten Kapalı.")
    }
  }
  if(!arg) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Davet Sistemi.")
        .setDescription("Davet:\n**e!davet kanal [#kanal]** -> Davet Sayacı Log Kanalı ayarlar.\n**e!davet kapat** -> Davet Sayar Sistemini kapatır.")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setTimestamp()
      message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invitecounter"],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};