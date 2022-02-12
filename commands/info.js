// karena kita memindahkan command bot-nya ke file terpusah, kita juga harus memanggil package dari API discord.js
const { MessageEmbed } = require("discord.js");
// memanggil file .json yang berisi semua info bot
const { version, prefix, botName, author } = require("../botInfo.json");
module.exports = {
    commandKey: "info",
    description: "This is info command",
    execute(message, args) {
        if (!args[1]) {
            const infoEmbed = new MessageEmbed()
                .setTitle("Bot Information")
                .setDescription(
                    "The purpose of this bot is for learning and assisting this channel. So use this bot wisely",
                )
                .addFields(
                    {
                        name: "Author",
                        value: author,
                    },
                    {
                        name: "Version",
                        value: version,
                    },
                    {
                        name: "Prefix",
                        value: prefix,
                    },
                    {
                        name: "date created",
                        value: "20-01-2022",
                    },
                )
                .setFooter({ text: `${botName} Bot version ${version}` });
            message.channel.send({ embeds: [infoEmbed] });
        } else {
            if (args[1] === "author") {
                message.channel.send(author); // method 'channel' yang digabungkan dengan send()' akan membuat bot membalaskan pesan seperti biasa ke dalam channel chat dimana command ditulis
            } else if (args[1] === "version") {
                message.channel.send(`Bot version: ${version}`);
            } else if (args[1] === "bot") {
                message.channel.send(
                    `Do you wanna know more about me? Use only 'info' command!`,
                );
            } else {
                message.channel.send(`Command haven't registered`);
            }
        }
    },
};
