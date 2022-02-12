/* Imported Modules */
const {
    Client, // tetapi, 'destructuring assignment'-nya tadi, tiap" nama variablenya harus sesuai dengan nama class yang dimaksud, agar penggunaannya masuk akal dan tidak membingungkan
    Collection,
    Intents,
} = require("discord.js");
const fs = require("fs"); // package madule Node.JS
const {
    token, // token dari Bot digunakan untuk key dalam menjalankan/eksekusi program dari bot
    prefix, // untuk membedakan pesan yang ditulis/ditujukan kepada BOT atau bukan, kita membutuhkan yang namanya 'prefix' -> prefix adalah sebuah simbol yang dituliskan sebelum perintah untuk BOT
} = require("./botInfo.json");
const greeting = require("./greeting.js");
const defaultRole = require("./defaultRole.js");
/* end of Imported Modules */

/* Instansiasi Class */
const usedIntents = new Intents(); // utility structure Intents digunakan untuk memudahkan user dalam memakai event
usedIntents.add(
    // utility itu disebut dengan 'Intents Bitfield'
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    // kita bisa menambah dan menghapus 'Intents' yang dengan method 'add()' dan 'remove()'
);

const client = new Client({ intents: usedIntents }); // variable untuk Bot dan spesifikasi request 'Client()'
const commands = new Collection(); // memanggil beberapa file secara langsung
/* end of Instasiasi Class */

// variable untuk membaca serta mengambil file yang berisi program perintah dan memiliki ekstensi '.js' yang akan digunakan dari folder commands
const files = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// looping variable files, karena didalamnya ada beberapa file
for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.set(command.commandKey, command);
}

// untuk tes apakah bot berjalan atau tidak, kita bisa menggunakan method 'on()', yang isi parameternya 'ready' kemudian 'callback'
client.once("ready", () => {
    console.log("Bot sudah Online");
    client.user.setActivity("Youtube", { type: "WATCHING" }); // kita bisa membuat dan menampilkan activity yang dilakukan oleh bot dengan method 'setActivity()'
    // function 'greeting' berfungsi agar bot menyapa member yang baru masuk
    greeting(client);
});

// function 'deafaultRole' berfungsi agar bot memberikan role deafault bagi member yang baru masuk
defaultRole(client);
// membuat bot agar bisa ber-interaksi dengan user discord di channel, dengan method 'on()' yang isi parameternya 'message' kemudian 'callback' untuk program perintahnya
client.on("messageCreate", (message) => {
    // men-cek apakah 'prefix' yang digunakan sudah betul atau belum, jika salah maka command tidak akan menghasilkan apapun
    if (!message.content.startsWith(prefix)) return;
    // untuk menangkap pesan perintah yang ditujukan kepada bot, bisa menggunakan 'arguments'
    let args = message.content.substring(prefix.length).split(" "); // nilai yang dikembalikan oleh method 'substring' bentuknya adalah array[]. Split disini berfungsi untuk identifikas pesan yang jumlah kata-nya lebih dari satu

    // 'switch' condition digunakan untuk menggantikan 'if else' condition karena nantinya akan ada banyak pembuatan perintah di 'case'-nya
    switch (args[0]) {
        case "ping":
            commands.get("ping").execute(message);
            break; // 'break' digunakan untuk menghentikan setiap command 'case' setelah dieksekusi, agar program tidak mengeksekusi code dibawahnya

        case "info":
            commands.get("info").execute(message, args);
            break;

        case "help":
            commands.get("help").execute(message);
            break;

        case "clear":
            commands.get("clear").execute(message, args);
            break;

        case "delay":
            commands.get("delay").execute(message);
            break;

        case "cooldown":
            commands.get("cooldown").execute(message);
            break;

        case "play":
            message.channel.send("Playing music.");
            break;

        case "kick":
            commands.get("kick").execute(message, args);
            break;

        case "ban":
            commands.get("ban").execute(message, args);

        case "broadcast":
            break;

        case "setRole":
            commands.get("setRole").execute(message);
            break;

        case "deleteRole":
            commands.get("deleteRole").execute(message);
            break;

        default:
            break;
    }
});

// menjalankan bot dengan method 'login()' yang diisi dengan token
client.login(token);
