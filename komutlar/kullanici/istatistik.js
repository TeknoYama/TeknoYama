const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const db = require("wio.db")
const os = require("os")


module.exports.run = async(client, message, args) => {

    const freeRAM = os.freemem()
    const usedRAM = os.totalmem() - freeRAM;
    const full = '█'
    const empty = '░'
    const precision = 20

    const diagramMaker = (used, free) => {
        const total = used + free;
        used = Math.round((used / total) * precision)
        free = Math.round((free / total) * precision)
        return full.repeat(used) + empty.repeat(free)
      }

      if(db.has(`dil.${message.guild.id}`)) {
            const ping = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(ayarlar.isim + " İstatistikleri")
                .setThumbnail(client.user.avatarURL())
                .addField("Server Size", client.guilds.cache.size)
                .addField("User Size", `${client.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}`)
                .addField("Used Ram", diagramMaker(usedRAM, freeRAM))
                .addField("Developers", "<@789608701601906739> | eyyüp.#4823 | 789608701601906739\n<@533696322381938689> | Raicon#1372 | 533696322381938689")
                .setFooter(ayarlar.footer)
                .setTimestamp()
            message.channel.send(ping)

      } else {
            const ping = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle(ayarlar.isim + " İstatistikleri")
                .setThumbnail(client.user.avatarURL())
                .addField("Sunucu Sayısı", client.guilds.cache.size)
                .addField("Kullanıcı Sayısı", `${client.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}`)
                .addField("Ram Kullanımı", diagramMaker(usedRAM, freeRAM))
                .addField("Geliştiriciler", "<@789608701601906739> | eyyüp.#4823 | 789608701601906739\n<@533696322381938689> | Raicon#1372 | 533696322381938689")
                .setFooter(ayarlar.footer)
                .setTimestamp()
            message.channel.send(ping)
        }
}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["i", "stats"],
    permLevel: 0
};

module.exports.help = {
    name: 'istatistik',
    description: 'Electus İstatistik',
    usage: 'yardım'
};