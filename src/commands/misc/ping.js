module.exports = {
  name: 'ping',
  desc: 'pong',
  run: async ({ sock, msg }) => {
    const to = msg.key.remoteJid;
    const t0 = Date.now();
    await sock.sendMessage(to, { text: `Pong!` });
    console.log('ping', Date.now()-t0, 'ms');
  }
};
