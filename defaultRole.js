module.exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        // console.log(member);
        // menangkap role deafault yang akan diberikan
        const roleTarget = member.guild.roles.cache.find(
            (r) => r.name === "pelancong",
        );
        // menangkap user yang masuk ke server
        const memberID = member.guild.members.cache.find(
            (user) => user.id === member.id,
        );
        // memberi role kepada meber yang masuk ke server
        memberID.roles.add(roleTarget.id);
    });
};
