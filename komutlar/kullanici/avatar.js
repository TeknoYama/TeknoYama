const Discord = require('discord.js');
     ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {

    let kullanıcı = message.mentions.users.first() || message.author;

    if(db.has("dil." + message.guild.id))  {
        const embed = new Discord.MessageEmbed()
        .setAuthor(kullanıcı.tag, kullanıcı.displayAvatarURL({ dynamic: true }))
        .setTitle('Your Avatar!')
        .setImage(kullanıcı.displayAvatarURL({ dynamic: true, size: 512 }))
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    } else {
        const embed = new Discord.MessageEmbed()
        .setAuthor(kullanıcı.tag, kullanıcı.displayAvatarURL({ dynamic: true }))
        .setTitle('UuUuU Avatarın!')
        .setImage(kullanıcı.displayAvatarURL({ dynamic: true, size: 512 }))
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        message.channel.send(embed)
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['av'],
    permLevel: 0
};

exports.help = {
    name: 'avatar'
};