import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"

import pino from "pino"

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: false,
    version,
    browser: ["FASHA-BOT", "Chrome", "1.0.0"]
  })

  // PAIRING CODE MODE
  if (process.argv.includes("--pairing") && !state.creds.registered) {
    const phone = process.argv[process.argv.indexOf("--pairing") + 1]

    if (!phone) return console.log("Isi nomor setelah --pairing")

    const code = await sock.requestPairingCode(phone)
    console.log("\n🔑 PAIRING CODE FASHA:")
    console.log(code)
  }

  sock.ev.on("creds.update", saveCreds)
  sock.ev.on("messages.upsert", m => {
    console.log("Pesan masuk:", m)
  })
}

startBot()
