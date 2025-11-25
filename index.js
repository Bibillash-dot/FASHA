import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"
import chalk from "chalk"

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    console.log(chalk.blueBright("Starting FASHA WhatsApp Bot..."))
}

startBot()
