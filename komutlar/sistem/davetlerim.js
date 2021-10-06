const Discord = require("discord.js"),
  db = require("wio.db");
  ayarlar = require("../../ayarlar.json")

exports.run = async (client, message, args, tools) => {


  let kişi;
  if (message.mentions.members.first()) {
    kişi = message.mentions.members.first();
  } else {
    kişi = message.author;
  }

  let davetleri = db.fetch(`davetleri.${message.guild.id}.${kişi.id}`) || 0

  let davetedenbunu = db.fetch(`davetedenbunu.${message.guild.id}.${kişi.id}`)

  if(davetedenbunu) {

    const embed = new Discord.MessageEmbed()
      .setTitle(`${kişi.displayName || kişi.username} Davet Bilgileri`)
      .addField("Şahsın Davet Sayısı:", davetleri, true)
      .addField("Şahsı Davet Eden", davetedenbunu, true)
      .setColor("GREEN")
      .setFooter(ayarlar.footer)
    message.channel.send(embed)

  } else {
    const embed = new Discord.MessageEmbed()
      .setTitle(`${kişi.displayName || kişi.username} Davet Bilgileri`)
      .addField("Şahsın Davet Sayısı:", davetleri, true)
      .addField("Şahsı Davet Eden", "Bulunamadı", true)
      .setColor("GREEN")
      .setFooter(ayarlar.footer)
    message.channel.send(embed)
  }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["davetk", "davetlerim"],
  permLevel: 0
};

exports.help = {
  name: "davetler"
};
