const config = require('../../../config');
module.exports = {
  name: 'owner',
  desc: 'show owner',
  run: async ({ sock, msg }) => {
    const to = msg.key.remoteJid;
    await sock.sendMessage(to, { text: `Owner: ${config.owner.join(', ')}` });
  }
};
