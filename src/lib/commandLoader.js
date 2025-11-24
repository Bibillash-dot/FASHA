const fs = require('fs');
const path = require('path');
const commands = new Map();

function loadCommands() {
  const base = path.join(__dirname, '..', 'commands');
  if (!fs.existsSync(base)) return;
  fs.readdirSync(base).forEach(dir => {
    const p = path.join(base, dir);
    if (fs.statSync(p).isDirectory()) {
      fs.readdirSync(p).filter(f => f.endsWith('.js')).forEach(file => {
        const cmd = require(path.join(p, file));
        if (cmd && cmd.name) commands.set(cmd.name, cmd);
      });
    }
  });
}

loadCommands();

module.exports = {
  get: (name) => commands.get(name),
  list: () => Array.from(commands.keys())
};
