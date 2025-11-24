const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
    const qrcode = require("qrcode-terminal");
    const pino = require("pino");

async function startBot() {
    const pairingMode = process.argv.includes("--pairing");
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    console.log(chalk.blue("Starting FASHA WhatsApp Bot..."));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !pairingMode,
        auth: state,
        version
    });

    // MODE PAIRING → kode 6 digit (tanpa QR)
    if (pairingMode && !state.creds.registered) {
        const phoneNumber = process.argv[3] || "6285166295982";  
        // Nomor kamu sudah terpasang di sini

        if (phoneNumber === "6285166295982") {
            console.log(chalk.red("❌ Masukkan nomor: node index.js --pairing 62xxxx"));
            process.exit(1);
        }

        console.log(chalk.yellow("⚡ Mengambil Pairing Code..."));

        const code = await sock.requestPairingCode(phoneNumber);
        console.log(chalk.green("\n› Kode Pairing kamu: " + code + "\n"));
    }

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (msg) => {
        await handler(sock, msg);
    });

    console.log(chalk.green("FASHA BOT is running..."));
}

startBot();
