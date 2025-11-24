const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const pino = require("pino");

async function startBot() {
    const pairingMode = process.argv.includes("--pairing");
    const phoneNumber = process.argv[3];

    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.blue("Starting FASHA WhatsApp Bot..."));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !pairingMode, // QR hanya muncul kalau BUKAN pairing
        auth: state,
        version
    });

    // MODE PAIRING
    if (pairingMode && !state.creds.registered) {

        if (!phoneNumber) {
            console.log(chalk.red("❌ Gunakan: node index.js --pairing 628xxxx"));
            process.exit(1);
        }

        console.log(chalk.yellow("⚡ Mengambil Pairing Code..."));
        const code = await sock.requestPairingCode(phoneNumber);

        console.log(chalk.green("\n› Kode Pairing kamu: " + code + "\n"));
    }

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (msg) => {
        console.log("Message received:", msg);
    });

    console.log(chalk.green("FASHA BOT is running..."));
}

startBot();
