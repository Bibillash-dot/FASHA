const config = require('../../../config');
module.exports = {
  name: 'menu',
  desc: 'show menu',
  run: async ({ sock, msg }) => {
    const to = msg.key.remoteJid;
    const txt = `*${config.botName}*\n\n• .menu\n• .ping\n• .owner\n\nOwner: ${config.owner.join(', ')}`;
    await sock.sendMessage(to, { text: txt });
  }
};
