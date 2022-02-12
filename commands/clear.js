const { MessageEmbed } = require("discord.js");
const { version, botName } = require("../botInfo.json");

module.exports = {
    commandKey: "clear",
    description: "This is clear chat command!",
    execute(message, args) {
        // permission agar command hanya bisa dipakai untuk kategori tertentu
        const permission = message.member.roles.cache.find(
            (r) => r.name === "pertapa",
        );
        if (permission) {
            if (!args[1]) {
                const infoClear = new MessageEmbed()
                    .setDescription("Add how much chat do you want to delete!")
                    .setFields({ name: "Example:", value: "-clear 10" })
                    .setFooter({ text: `${botName} Bot version ${version}` });
                message.channel.send({ embeds: [infoClear] });
            } else {
                message.channel.bulkDelete(1 + args[1], true);
            }
        } else {
            message.reply(
                `Sorry, you're not allowed to use \`${this.commandKey}\` command, only member with allowed role can use this command!`,
            );
        }
    },
};
