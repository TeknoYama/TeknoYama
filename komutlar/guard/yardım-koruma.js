const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db");

exports.run = async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
        .setTitle(ayarlar.isim + " Koruma Komutları")
        .setFooter(ayarlar.footer)
        .setColor("GREEN")
        .setDescription("Örnek Komut: e!kanal-silme-koruma")
        .addField("Koruma", "**e!küfür aç** -> Edilen Küfürleri Engeller.\n**e!kanal-silme-koruma aç** -> Kanal Silme Korumasını açar.\n**e!rol-silme-koruma aç** -> Rol Silme Korumasını Açar.")
        .setTimestamp()
    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["guard"],
    permLevel: 0
};

exports.help = {
    name: 'koruma',
    description: 'koruma.',
    usage: 'koruma'
};