const { MessageEmbed } = require("discord.js");
const { version, botName } = require("../botInfo.json");

module.exports = {
    commandKey: "kick",
    description: "This is kick member command!",
    execute(message, args) {
        const permission = message.member.roles.cache.find(
            (r) => r.name === "pertapa",
        );
        if (permission) {
            if (!args[1]) {
                const infoKick = new MessageEmbed()
                    .setDescription(`Add who's member do you want to kick!`)
                    .setFields({ name: "Example:", value: "-kick @capchipcup" })
                    .setFooter({ text: `${botName} Bot version ${version}` });
                message.channel.send({ embeds: [infoKick] });
            } else {
                const userKick = message.mentions.users.first();
                // console.log(userKick);
                if (userKick) {
                    const memberKick = message.guild.members.cache.get(
                        userKick.id,
                    );
                    // console.log(memberKick);
                    if (memberKick) {
                        memberKick
                            .kick(`Your'e kicked from Anak Jembut!`)
                            .then(() => {
                                message.channel.bulkDelete(1);
                                message.reply(
                                    `${userKick.tag} has been kicked!`,
                                );
                            })
                            .catch((err) => {
                                message.channel.bulkDelete(1);
                                message.reply(`You can't kick this member!`);
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
