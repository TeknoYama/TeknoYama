const Discord = require("discord.js");
const db = require("wio.db");
const ayarlar = require("../../ayarlar.json");
const canvas = require('canvas');
const colors = require('../../colors.json');
const { cssColorToHex } = require("jimp");

exports.run = async (client, message, args, tools) => {

    if (!db.has("seviyesistem." + message.guild.id)) return message.channel.send("Seviye Sistemi Bu Sunucuda Kapalı Olduğu için Komut Devre Dışı!");

    let kişi;
    if (message.mentions.members.first()) {
        kişi = message.mentions.members.first();
    } else {
        kişi = message.author;
    }

    let xp = db.fetch("xpoyuncu." + message.guild.id + kişi.id) || 0
    let seviye = db.fetch("seviyeoyuncu" + message.guild.id + kişi.id) || 0

    const rankcard = canvas.createCanvas(800, 333);
    const ctx = rankcard.getContext("2d");
    
    const background = await canvas.loadImage("https://cdn.discordapp.com/attachments/804222634526638140/805755449428148224/pic_eyyub.jpg")

    ctx.drawImage(background, 0, 0, rankcard.width, rankcard.height);

    ctx.fillStyle = colors.white;
    var size1 = 40;
    var size2 = 50;
    var size3 = 40;

    var name = client.users.cache.get(kişi.id).tag;
    do {
        ctx.font = `${size1 -= 5}px sans-serif`;
    } while (ctx.measureText(name).width > rankcard.width - 450);
    ctx.fillText(name, 325, 100)


    var seviye1 = 'Seviye: ' + seviye

    do {
        ctx.font = `${size2 -= 5}px sans-serif`;
    } while (ctx.measureText(seviye1).width > rankcard.width - 450);
    ctx.fillText(seviye1, 325, 150)


    var xp1 = 'XP: ' + xp + " / 300"

    do {
        ctx.font = `${size3 -= 3}px sans-serif`;
    } while (ctx.measureText(xp1).width > rankcard.width - 450);
    ctx.fillText(xp1, 325, 200)

    ctx.beginPath();
    ctx.arc(140, 160, 105, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    


    const avatar = await canvas.loadImage(kişi.displayAvatarURL({ format: 'jpg' }));

    ctx.drawImage(avatar, 35, 35, 220, 230)

    const final = new Discord.MessageAttachment(rankcard.toBuffer(), "rankcard.png")
    return message.channel.send(final);


};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["seviyem", "rank"],
    permLevel: 0
};

exports.help = {
    name: "levelım"
};
