export default async (sock, m) => {
   const txt = `
*FASHA BOT MENU*

• .ping
• .help
• .ai <teks>
`
   sock.sendMessage(m.key.remoteJid, { text: txt })
}
