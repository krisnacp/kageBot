module.exports = (client) => {
    const welcomeID = "938746735763804251"; // welcome channel
    client.on("guildMemberAdd", (member) => {
        // console.log(member);
        if (!welcomeID) {
            return;
        }
        const message = `Glad you're join this server, <@${member.id}>! Welcome to Anak Jembut!`;
        const channel = member.guild.channels.cache.get(welcomeID);
        channel.send(message);
    });
};
