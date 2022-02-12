const { MessageEmbed } = require("discord.js");
const { version, botName } = require("../botInfo.json");

module.exports = {
    commandKey: "setRole",
    description: "This is set role command!",
    execute(message) {
        /* roles with permission */
        const pertapa = message.member.roles.cache.find(
            (r) => r.name === "pertapa",
        );
        const marbot = message.member.roles.cache.find(
            (r) => r.name === "marbot server",
        );
        /* end of roles with permission */

        // cek apakah user/member yang menjalankan command sesuai dengan 'role permission', jika tidak, maka command tikdak akan bisa digunakan
        if (pertapa || marbot) {
            // menangkap user/member yang target ke dalam variable
            const userTarget = message.mentions.users.first();
            // cek apakah user yang di-tag ada di server atau tidak, jika tidak, maka akan tampil pesan user yang di-tag tidak ada di dalam server
            if (userTarget) {
                // mengambil id dari user/member yang di-tag ke dalam variable
                const userTargetID = message.guild.members.cache.get(
                    userTarget.id,
                );
                if (userTargetID) {
                    let roleTarget = message.guild.roles.cache.find(
                        (r) => r.name === "pelancong",
                    );
                    // console.log(roleTarget);
                    let matchingID = message.guild.members.cache.find(
                        (member) => member.id === userTarget.id,
                    );
                    // console.log(member);
                    matchingID.roles.add(roleTarget.id);
                    message.channel.send(
                        `Success adding ${matchingID} to ${roleTarget} role`,
                    );
                }
            } else {
                message.reply(
                    `Sorry, the user you tagged isn't in this server!`,
                );
            }
        } else {
            message.reply(
                `Sorry, you're not allowed to use \`${this.commandKey}\` command, only member with allowed role can use this command`,
            );
        }
    },
};
