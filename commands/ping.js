module.exports = {
    commandKey: "ping",
    description: "This is ping command",
    execute(message) {
        message.reply("pong!");
    },
};
