const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const pino = require("pino");

async function startBot() {
    const isPairing = process.argv.includes("--pairing");

    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.cyan("🚀 Starting FASHA WhatsApp Bot...\n"));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, // QR SELALU DIMATIKAN
        auth: state,
        version,
        browser: ["FASHA-BOT", "Chrome", "1.0"]
    });

    // === MODE PAIRING CODE (NO QR) ===
    if (isPairing && !state.creds.registered) {
        const numberIndex = process.argv.indexOf("--pairing") + 1;
        const phoneNumber = process.argv[numberIndex];

        if (!phoneNumber) {
            console.log("❌ Tambahkan nomor: node index.js --pairing 628xxxx");
            process.exit();
        }

        console.log("📞 Nomor:", phoneNumber);
        console.log("⏳ Mengambil pairing code...\n");

        const code = await sock.requestPairingCode(phoneNumber);

        console.log(chalk.green("🔑 Pairing code: " + code));
        console.log(chalk.yellow("\nMasukkan kode ini ke WhatsApp kamu!"));
    }

    sock.ev.on("creds.update", saveCreds);
}

startBot();
