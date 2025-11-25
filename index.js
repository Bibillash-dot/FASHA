const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const pino = require("pino");

const pairingNumber = process.argv.includes("--pairing")
    ? process.argv[process.argv.indexOf("--pairing") + 1]
    : null;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.blue("Starting FASHA WhatsApp Bot..."));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state,
        printQRInTerminal: !pairingNumber,
        mobile: false,
        version,
        browser: ["FASHA", "Chrome", "120.0.0"],
        pairingNumber
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") console.log(chalk.green("FASHA BOT connected!"));
        if (connection === "close") console.log("Connection closed:", lastDisconnect?.error);
    });
}

startBot();
