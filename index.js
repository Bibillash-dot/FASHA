const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const qrcode = require("qrcode-terminal");
const pino = require("pino");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.blue("Starting FASHA WhatsApp Bot..."));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        version
    });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("messages.upsert", async (msg) => {
        await handler(sock, msg);
    });

    console.log(chalk.green("FASHA BOT is running..."));
}

startBot();
