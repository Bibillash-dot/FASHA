const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const handler = require('./handler');

async function startBaileys() {
  const { state, saveCreds } = await useMultiFileAuthState('./sessions');
  const sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    if (update.qr) qrcode.generate(update.qr, { small: true });
    if (update.connection === 'close') {
      console.log('Connection closed:', update.lastDisconnect?.error || 'unknown');
    }
    if (update.connection === 'open') {
      console.log('Connected to WhatsApp');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    try { await handler(sock, m); } catch (e) { console.error('Handler error', e); }
  });

  return sock;
}

module.exports = { startBaileys };
