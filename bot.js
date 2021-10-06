const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('wio.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const { GiveawaysManager } = require('discord-giveaways')
client.giveaways = new GiveawaysManager(client, {
    storage: './cekilisler.json',
    updateCountdownEvery: 1000,
    embedColor: 'RED',
    reaction: '🎉'
})


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

// Komutlar
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/kullanici/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/kullanici/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/kullanici/${command}`)];
            let cmd = require(`./komutlar/kullanici/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/kullanici/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/kullanici/${command}`)];
            let cmd = require(`./komutlar/kullanici/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
// Moderasyon

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/moderasyon/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/moderasyon/${f}`);
        log(`Yüklenen Moderasyon komut'u: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/moderasyon/${command}`)];
            let cmd = require(`./komutlar/moderasyon/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/moderasyon/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/moderasyon/${command}`)];
            let cmd = require(`./komutlar/moderasyon/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Guard

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/guard/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/guard/${f}`);
        log(`Yüklenen Guard komut'u: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/guard/${command}`)];
            let cmd = require(`./komutlar/guard/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/guard/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/guard/${command}`)];
            let cmd = require(`./komutlar/guard/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Sistem

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/sistem/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/sistem/${f}`);
        log(`Yüklenen Sistem komut'u: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/sistem/${command}`)];
            let cmd = require(`./komutlar/sistem/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/sistem/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/sistem/${command}`)];
            let cmd = require(`./komutlar/sistem/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Kayıt

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/register/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/register/${f}`);
        log(`Yüklenen Kayıt komut'u: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/register/${command}`)];
            let cmd = require(`./komutlar/register/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/register/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/register/${command}`)];
            let cmd = require(`./komutlar/register/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Oy Veren Kişiler

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/oyverdi/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} oyverdi komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/oyverdi/${f}`);
        log(`Yüklenen oyverdi komut'u: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/oyverdi/${command}`)];
            let cmd = require(`./komutlar/oyverdi/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/oyverdi/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/oyverdi/${command}`)];
            let cmd = require(`./komutlar/oyverdi/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

// Giriş ayarları
//Otorol
client.on("guildMemberAdd", async member => {
    if (db.has(`otorol.${member.guild.id}`)) {

        let rol = member.guild.roles.cache.get(db.fetch(`otorol.${member.guild.id}`))
        member.roles.add(rol)

        if (db.has(`otorolkanal.${member.guild.id}`)) {
            let otorolkanal = member.guild.channels.cache.get(db.fetch(`otorolkanal.${member.guild.id}`))

            let mesaj;
            if (db.fetch(`otorolmesaj.${member.guild.id}`)) mesaj = db.fetch(`otorolmesaj.${member.guild.id}`).replace(`-uye-`, member).replace(`-toplam-`, member.guild.memberCount).replace(`-rol-`, `<@&${rol}>`)
            else mesaj = `${member} aramıza katıldı ona ${rol} Rolünü verdim`


            //`${member} aramıza katıldı ona <@&${rol}> Rolünü verdim`


                const otoembed = new Discord.MessageEmbed()
                    .setDescription(mesaj)
                    .setFooter(ayarlar.footer)
                    .setColor("GREEN")
                otorolkanal.send(otoembed)
        }
    }
})
 //sayaç
client.on("guildMemberAdd", async member => {

    if (db.has(`sayaçkanal.${member.guild.id}`)) {
        if (db.has(`sayaçsayı.${member.guild.id}`)) {
            if (db.fetch(`sayaçsayı.${member.guild.id}`) > member.guild.memberCount) {

                let sayaçkanal = member.guild.channels.cache.get(db.fetch(`sayaçkanal.${member.guild.id}`))
                let sayaçsayı = db.fetch(`sayaçsayı.${member.guild.id}`)

                let mesaj;
                if (db.fetch(`sayaçmesaj.${member.guild.id}`)) mesaj = db.fetch(`sayaçmesaj.${member.guild.id}`).replace(`-uye-`, member).replace(`-toplam-`, member.guild.memberCount).replace(`-kalan-`, `${sayaçsayı - member.guild.memberCount}`)
                else mesaj = `${member} aramıza Katıldı onunla beraber ${sayaçsayı} kişi olmamıza ${sayaçsayı - member.guild.memberCount} kişi kaldı!`

                const embedsayaç = new Discord.MessageEmbed()
                    .setDescription(mesaj)
                    .setFooter(ayarlar.footer)
                    .setColor("GREEN")
                sayaçkanal.send(embedsayaç)
            } else {
                let sayaçkanal = member.guild.channels.cache.get(db.fetch(`sayaçkanal.${member.guild.id}`))
                let sayaçsayı = db.fetch(`sayaçsayı.${member.guild.id}`)
                const embedsayaçbitti = new Discord.MessageEmbed()
                    .setDescription(`${member} Aramıza Katıldı Ve Tam ${sayaçsayı} Kişiyiz!`)
                    .setFooter(ayarlar.footer)
                    .setColor("GREEN")
                sayaçkanal.send(embedsayaçbitti)
                db.delete(`sayaçsayı.${member.guild.id}`)
                db.delete(`sayaçkanal.${member.guild.id}`)
            }
        }
    }

})

client.on("guildMemberRemove", member => {

    if (db.has(`sayaçkanal.${member.guild.id}`)) {
        if (db.has(`sayaçsayı.${member.guild.id}`)) {

            let sayaçkanal = member.guild.channels.cache.get(db.fetch(`sayaçkanal.${member.guild.id}`))
            let sayaçsayı = db.fetch(`sayaçsayı.${member.guild.id}`)

            let mesaj = `${member} aramızdan ayrıldı o ayrıldıktan beri ${sayaçsayı} kişi olmamıza ${sayaçsayı - member.guild.memberCount} kişi kaldı!`

            const embedsayaç = new Discord.MessageEmbed()
                .setDescription(mesaj)
                .setFooter(ayarlar.footer)
                .setColor("GREEN")
            sayaçkanal.send(embedsayaç)
        } 
    }

})



// Giriş
client.on("guildMemberAdd", async member => {


    if (db.has(`giriş_çıkışkanal.${member.guild.id}`)) {
        let girişkanal = member.guild.channels.cache.get(db.fetch(`giriş_çıkışkanal.${member.guild.id}`))
        if(db.has(`premium.${member.id}`)) {

            const embedgirişçıkış = new Discord.MessageEmbed()
                .setTitle(":inbox_tray: Aramıza Hoşgeldin " + member.displayName)
                .setColor("GREEN")
                .setDescription("Aramıza bir Premium Üye Katıldı <@" + member + ">\nSeninle Beraber " + member.guild.memberCount + " Kişiyiz!")
            girişkanal.send(embedgirişçıkış)

        } else {

            const embedgirişçıkış = new Discord.MessageEmbed()
                .setTitle(":inbox_tray: Aramıza Hoşgeldin " + member.displayName)
                .setColor("GREEN")
                .setDescription("Aramıza Hoşgeldin <@" + member + ">\nSeninle Beraber " + member.guild.memberCount + " Kişiyiz!")
            girişkanal.send(embedgirişçıkış)
        }

    }

})

//Çıkış Ayarları

client.on("guildMemberRemove", async member => {

    if (db.has(`giriş_çıkışkanal.${member.guild.id}`)) {


        let girişkanal = member.guild.channels.cache.get(db.fetch(`giriş_çıkışkanal.${member.guild.id}`))
        const embedgirişçıkış = new Discord.MessageEmbed()
            .setTitle(":no_entry_sign: Aramızadan Ayrıldı " + member.displayName)
            .setColor("GREEN")
            .setDescription("Görüşürüz <@" + member + ">\nSeni Gittikten beri " + member.guild.memberCount + " Kişiyiz!")
        girişkanal.send(embedgirişçıkış)

    }
})

// Mesaj Eventleri

client.on("message", async msg => {

    if (db.has("seviyesistem." + msg.guild.id)) {
        if(msg.content.startsWith(prefix)) return;

        if (msg.author.bot) return;

        let xp = db.fetch("xpverilcek." + msg.guild.id) || 2

        let kanal = msg.guild.channels.cache.get(db.fetch("seviyelogkanal." + msg.guild.id)) || msg.channel

        let xpoyuncu = db.fetch("xpoyuncu." + msg.guild.id + msg.author.id)

        db.add("xpoyuncu." + msg.guild.id + msg.author.id, xp)

        if (xpoyuncu >= 300) {

            db.add("seviyeoyuncu" + msg.guild.id + msg.author.id, 1)
            db.set("xpoyuncu." + msg.guild.id + msg.author.id, 0)

            kanal.send(":white_check_mark: UuUuU <@" + msg.author.id + "> Seviye Atladı Yeni Seviyesi: " + db.fetch("seviyeoyuncu" + msg.guild.id + msg.author.id))
        }

    }

})

client.on("message", async msg => {

    if (db.has("saassistem." + msg.guild.id)) {

        if(msg.author.bot) return;

        if (msg.content.toLocaleLowerCase() == "sa") {
            msg.reply("Aleyküm Selam, Hoşgeldin!").then(b => b.delete({timeout:3000}))
        }

    }

})

client.on("message", async msg => {

    if (db.has("saassistem." + msg.guild.id)) {

        if(msg.author.bot) return;

        if (msg.content.toLocaleLowerCase() == "slm") {
            msg.reply("Aleyküm Selam, Hoşgeldin!").then(b => b.delete({timeout:3000}))
        }

    }

})

client.on("message", async msg => {

    if (db.has("saassistem." + msg.guild.id)) {

        if(msg.author.bot) return;

        if (msg.content.toLocaleLowerCase() == "selam") {
            msg.reply("Aleyküm Selam, Hoşgeldin!").then(b => b.delete({timeout:3000}))
        }

    }

})

client.on("message", async msg => {

    if (db.has("saassistem." + msg.guild.id)) {

        if(msg.author.bot) return;

        if (msg.content.toLocaleLowerCase() == "selamün aleyküm") {
            msg.reply("Aleyküm Selam, Hoşgeldin!").then(b => b.delete({timeout:3000}))
        }

    }

})

// Küfür Engel

client.on("message", async msg => {

    if (db.has(`kufurengel.${msg.guild.id}`)) {


        let kufuracik = db.has(`kufurengel.${msg.guild.id}`)

        if (kufuracik) {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                const küfür = ["ananı", "oç", "piç", "oc", "anani", "ibne", "it", "orospu", "orusbu", "anani", "pic", "pıc", "pıç", "anneni", "annenı", "sik", "sikim", "sık", "sikiş", "sikerim", "am", "amcık", "amk", "amq", "awq", "kahbe", "oruspu", "siktim", "sq", "sg", "amcık", "aq", "sex", "yarrak", "göt", "sik", "sikiyim", "siktir", "puşt", "pust", "oc", "anan"]
                let kelimeler = msg.content.toLowerCase().split(' ');
                kelimeler.forEach(kelime => {
                    if (küfür.some(küfür => küfür === kelime)) {
                        msg.delete()
                        msg.channel.send("<@" + msg.author.id + "> Bu Sunucuda Küfür Filtresi Aktiftir!").then(b => b.delete({timeout:3000}))
                    }
                })
            }
        }
    }
})


//Fake
client.on("message", async message => {
    if (!message.guild) return;
    if (message.content.startsWith(".fakeg")) {
        let role = "805047032325996546"
        let member = client.guilds.cache.get("805047032309350440").members.cache.get(message.author.id);
        if (member.roles.cache.has(role)) {
            message.react(`✅`)
            client.emit(
                "guildMemberAdd",
                message.member || (await message.guild.fetchMember(message.author))
            );

        } else {
            message.channel.send("Bu Komutu Sadece Bot Adminleri Kullanabilir!").then(b => b.delete({timeout:3000}))
        }
        
    }
});


client.on("message", async message => {
    if (!message.guild) return;
    if (message.content === ".fakeç") {
        let role = "805047032325996546"
        let member = client.guilds.cache.get("805047032309350440").members.cache.get(message.author.id);
        if (member.roles.cache.has(role)) {
            message.react(`✅`)
            client.emit(
                "guildMemberRemove",
                message.member || (await message.guild.fetchMember(message.author))
            );

        } else {
            message.channel.send("Bu Komutu Sadece Bot Adminleri Kullanabilir!").then(b => b.delete({timeout:3000}))
        }
        
    }
});

//Davet Sistem

const invites = {};
const wait = require('util').promisify(setTimeout);


client.on("guildMemberAdd", async member => {

    if(db.has("davetkanal." + member.guild.id)) {


        let kanal = member.guild.channels.cache.get(db.fetch("davetkanal." + member.guild.id))

        let g = member.guild

        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
          });
            g.fetchInvites().then(guildInvites => {
                const ei = invites[member.guild.id];
                invites[member.guild.id] = guildInvites;
                const invite = guildInvites.find(i => ei.get(i.code));
                const inviter = client.users.cache.get(invite.inviter.id);
                db.set(`davetleri.` + member.guild.id +"."+ member.id, 0)
                db.add(`davetleri.` + member.guild.id +"."+ inviter.id, +1)
                db.set(`davetedenbunu.` + member.guild.id + "." + member.id, inviter.id)
    
                let sayı = db.fetch(`davetleri.`+ member.guild.id +"." + inviter.id)
    
    
                kanal.send(`${member} adlı kişi sunucuya katıldı. Kişiyi davet eden: ${inviter} (**${sayı}**)!`)
    
            }).catch(err => {
                kanal.send(`${member} adlı kişi sunucuya katıldı. Kişiyi davet eden: Bulunamadı`)
            });
        
    };
});

client.on("guildMemberRemove", async member => {

    if(db.has("davetkanal." + member.guild.id)) {

        let kanal = member.guild.channels.cache.get(db.fetch("davetkanal." + member.guild.id))

        let daveteden = db.fetch(`davetedenbunu.` + member.guild.id + "." + member.id)


        if(db.has(`davetedenbunu.` + member.guild.id + "." + member.id)) {
            let sayı = parseInt(db.fetch(`davetleri.` + member.guild.id + "." + daveteden))
            db.add(`davetleri.` + member.guild.id + "." + daveteden, -1)
            db.delete(`davetedenbunu.` + member.guild.id + "." + member.id)
            kanal.send(`${member} adlı kişi sunucudan ayrıldı. Kişiyi davet eden: <@${daveteden}> (**${sayı}**)!`)
        } else {
            kanal.send(`${member} adlı kişi sunucudan ayrıldı. Kişiyi davet eden: **Bulunamadı**!`)
        }


    }

})

client.on("guildMemberAdd", async member => {
    if(db.has("kayıtkanal." + member.guild.id)) {


        let kanal = member.guild.channels.cache.get(db.fetch("kayıtkanal." + member.guild.id))

        const embed = new Discord.MessageEmbed()
            .setTitle("Aramıza Hoşgeldin " + member.displayName)
            .setDescription("<@" + member.id + "> Aramıza Hoşgeldin Yetkililer Seninle İlgilenecektir!\nYetkililer Gelene Kadar Kendimi Tanıtım\nBen "+ayarlar.isim+"!\nProfessyönelce Geliştirilmiş Bir Botum\nYaşım 1 ve Çok Az Sunucu Beni Kullanmakta!\nYapımım Tam 3 Ay Sürdü.\nSende Kendini "+ayarlar.isim+"'a Tanıtmak İstermisin?")
            .setColor("GREEN")
            .setFooter(ayarlar.footer)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setImage("https://cdn.discordapp.com/attachments/750680536179015740/792444183218225182/gif.gif")
        kanal.send(embed)

    }
})
// Kanal Silme Eventleri
// Kanal Silme Koruması
client.on("channelDelete", async channel => {

    if(db.has(`kanalsilmekoruması.${channel.guild.id}`)) {

        channel.clone()
    }

})

client.on("roleDelete", async role => {


    if(db.has(`rolsilmekoruması.${role.guild.id}`)) {

        let position = role.setPosition(role.position)

        role.guild.roles.create({
            data: {
                name: role.name,
                color: role.color,
                permissions: role.permissions,
                hoist: role.hoist,
                mentionable: role.mentionable,
                position: role.rawPosition
            }
        })
    }

})


client.login(ayarlar.token);