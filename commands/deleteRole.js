module.exports = {
    commandKey: "deleteRole",
    description: "This is delete role command",
    execute(message) {
        /* roles with permission */
        const pertapa = message.member.roles.cache.find(
            (r) => r.name === "pertapa",
        );
        const marbot = message.member.roles.cache.find(
            (r) => r.name === "marbot server",
        );
        /* end of roles with permission */

        if (pertapa || marbot) {
            const userTarget = message.mentions.users.first();
            if (userTarget) {
                // console.log(userTarget);
                const userTargetID = message.guild.members.cache.get(
                    userTarget.id,
                );
                if (userTargetID) {
                    // console.log(userTargetID);
                    let targetRole = message.guild.roles.cache.find(
                        (r) => r.name === "pelancong",
                    );
                    let matchingID = message.guild.members.cache.find(
                        (member) => member.id === userTarget.id,
                    );
                    matchingID.roles.remove(targetRole.id);
                    message.channel.send(
                        `Success removing ${matchingID} from ${targetRole} role`,
                    );
                }
            } else {
                message.reply(
                    `Sorry, the user you tagged isn't in this server!`,
                );
            }
        } else {
            message.reply(
                `Sorry, you're not allowed to use \`${this.commandKey}\` command, only member with allowed role can use this command!`,
            );
        }
    },
};
