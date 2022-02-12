const { Collection } = require("discord.js");
const cooldown = new Collection();

module.exports = {
    commandKey: "cooldown",
    description: "This is cooldown command",
    execute(message) {
        if (cooldown.has(message.author.id)) {
            message.reply(
                "Tunggu 5 detik untuk dapat menggunakan commad ini lagi",
            );
        } else {
            message.channel.send("ini adalah cooldown");
            cooldown.set(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 1000 * 5);
        }
    },
};
