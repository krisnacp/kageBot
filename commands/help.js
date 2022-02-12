const { MessageEmbed } = require("discord.js");
const { version, botName } = require("../botInfo.json");

module.exports = {
    commandKey: "help",
    description: "This is help command",
    execute(message) {
        const helpEmbed = new MessageEmbed() // class 'MessageEmbed()' merupakan fungsi untuk menampilkan pesan yang dikirim oleh bot ke channel dalam bentuk block pesan, ada beberapa method yang bisa diterapkan di dalamnya
            .setTitle("Command list:") // method untuk judul dari class 'MessageEmbed()'
            .addField("help", "Bot Commands") // membuat perintah untuk bot, agar membalas pesan dengan 'embed message' yang digabung dengan method 'addField(name, value, inline?(optional))' yang parameternya ada nama pesan, isi pesan, dan yang ketiga optional, yaitu apakah pesan akan berbentuk inline atau tidak
            .addField("ping", "Ping Bot")
            .addField("info", "Bot Information")
            .addField("clear", "Delete Previous Message")
            .setColor("PURPLE")
            .setFooter({ text: `${botName} Bot version ${version}` });
        message.channel.send({ embeds: [helpEmbed] });
    },
};
