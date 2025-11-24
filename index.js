const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const pino = require("pino");

async function startBot() {
    const pairingCode = process.argv.includes("--pairing");
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.blue("Starting FASHA WhatsApp Bot..."));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, // QR DIMATIKAN
        auth: state,
        version,
        browser: ["FASHA-BOT", "Chrome", "1.0.0"]
    });

    // === MODE PAIRING CODE ===
    if (pairingCode && !state.creds.registered) {
        const phoneNumber = process.argv[process.argv.indexOf("--pairing") + 1];

        if (!phoneNumber)
            return console.log("❌ Masukkan nomor setelah --pairing");

        console.log(`📞 Nomor: ${phoneNumber}`);

        const code = await sock.requestPairingCode(phoneNumber);
        console.log("\n🔑 PAIRING CODE FASHA:");
        console.log(chalk.green(code));
    }

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (msg) => {
        await handler(sock, msg);
    });

    console.log(chalk.green("FASHA BOT is running..."));
}

startBot();
