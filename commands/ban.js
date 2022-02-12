const { MessageEmbed } = require("discord.js");
const { version, botName } = require("../botInfo.json");

module.exports = {
    commandKey: "ban",
    description: "This is ban member command!",
    execute(message, args) {
        const permission = message.member.roles.cache.find(
            (r) => r.name === "pertapa",
        );
        if (permission) {
            if (!args[1]) {
                const infoBan = new MessageEmbed()
                    .setDescription(`Add who's member do you want to ban!`)
                    .setFields({ name: "Example:", value: "-ban @capchipcup" })
                    .setFooter({ text: `${botName} Bot version ${version}` });
                message.channel.send({ embeds: [infoBan] });
            } else {
                const userBan = message.mentions.users.first();
                // console.log(userBan);
                if (userBan) {
                    const memberBan = message.guild.members.cache.get(
                        userBan.id,
                    );
                    // console.log(memberBan);
                    if (memberBan) {
                        memberBan
                            .ban({ days: 1, reason: "They deserved it" })
                            .then(() => {
                                message.channel.bulkDelete(1);
                                message.reply(
                                    `${userBan.tag} has been banned!`,
                                );
                            })
                            .catch((err) => {
                                message.channel.bulkDelete(1);
                                message.reply(`You can't ban this member!`);
                                console.log(err);
                            });
                    }
                } else {
                    message.channel.bulkDelete(1);
                    message.reply(`User that you're tag isn't in this server`);
                }
            }
        } else {
            message.reply(
                `Sorry, you're not allowed to use \`${this.commandKey}\` command, only member with allowed role can use this command!`,
            );
        }
        // const member = message.mentions.users.first();
        // if (member) {
        //     const memberTarget = message.guild.members.cache.get(member.id);
        // } else {
        //     msg.reply(
        //         `Sorry, you're not allowed to use this command, only member with allowed role can use this.`,
        //     );
        // }
    },
};
