const config = require('../../config');
const loader = require('./commandLoader');
const utils = require('./utils');

module.exports = async (sock, m) => {
  try {
    const msg = m.messages[0];
    if (!msg.message) return;
    if (msg.key && msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    if (!text) return;

    const prefix = config.prefix || '.';
    if (!text.startsWith(prefix)) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = loader.get(cmdName);
    if (!cmd) return;

    await cmd.run({ sock, msg, args, from, config, utils });
  } catch (e) {
    console.error('Handler main error:', e);
  }
};
