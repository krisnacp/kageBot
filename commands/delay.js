module.exports = {
    commandKey: "delay",
    description: "This is delay command",
    execute(message) {
        setTimeout(() => {
            message.channel.send("Ini adalah percobaan fitur delay");
        }, 1000 * 5);
    },
};
