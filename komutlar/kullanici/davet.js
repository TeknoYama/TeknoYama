const Discord = require('discord.js');
ayarlar = require("../../ayarlar.json");
const db = require("wio.db")

exports.run = async(client, message, args) => {

    if(db.has("dil.")) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Davet Linkleri!")
        .setDescription("["+ayarlar.isim+" Invite](https://discord.com/api/oauth2/authorize?client_id=804705181115088926&permissions=8&scope=bot)\n[Vote the bot on Bots Land](https://bots.land/bot/804705181115088926)\n[Vote the Bot on TOP.GG ("+ ayarlar.oy +")]")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .setTitle("Davet Linkleri!")
        .setDescription("["+ayarlar.isim+" Bot'u Davet Et](https://discord.com/api/oauth2/authorize?client_id=804705181115088926&permissions=8&scope=bot)\n[Bot'a Oy Ver Bots Land](https://bots.land/bot/804705181115088926)\n[Bot'a Oy Ver TOP.GG ("+ ayarlar.oy +")]")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['davetet', "links"],
    permLevel: 0
};

exports.help = {
    name: 'link'
};