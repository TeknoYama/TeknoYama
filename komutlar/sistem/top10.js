const Discord = require("discord.js")
const db = require("wio.db")
const ayarlar = require("../../ayarlar.json")

exports.run = async (client, message, args) => {

    
    const difarr = [];
            message.guild.members.cache.forEach(user => {
                difarr.push(user);
            })

            var allmemberlen = difarr.length
            let people = 0;
            let peopleToShow = 10;
            let sırası = 0;

            let mes = [];
            let davet = [];

            for (let i = 0; i < allmemberlen; i++) {
                var amount = db.fetch("seviyeoyuncu" + message.guild.id + difarr[i].id)

                if (amount == null) continue;

                mes.push({
                    name: "<@"+difarr[i].id+">",
                    amount: amount
                });
            }
            for (let i = 0; i < allmemberlen; i++) {
                var amount = db.fetch(`davetleri.${message.guild.id}.${difarr[i].id}`)

                if (amount == null) continue;

                davet.push({
                    name: "<@"+difarr[i].id+">",
                    amount: amount
                });
            }

            const realArr = []
            mes.sort((a, b) => b.amount - a.amount);
            for (let k = 0; k < mes.length; k++) {
                people++
                sırası++
                if (people >= peopleToShow) continue;
                realArr.push(sırası + ") " + mes[k].name + " `" + mes[k].amount + " Seviye`");
            }
            
            const realArrd = []
            davet.sort((a, b) => b.amount - a.amount);
            for (let k = 0; k < davet.length; k++) {
                people++
                sırası++
                if (people >= peopleToShow) continue;
                realArrd.push(sırası + ") " + davet[k].name + " `" + davet[k].amount + " Davet`");
            }
            var finalLbd = realArrd.join("\n") || "YOK"
            var finalLb = realArr.join("\n") || "YOK"
            const embed = new Discord.MessageEmbed()
                .setTitle("Seviye Sıralaması")
                .addField("Davet Sıralaması", finalLbd, true)
                .addField("Seviye Sıralaması", finalLb, true)
                .setColor("GREEN")
                .setFooter(ayarlar.footer)
            message.channel.send(embed)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["top"],
    permLevel: 0
};

exports.help = {
    name: 'top10',
    description: 'top10',
    usage: 'top10'
};

