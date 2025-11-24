const chalk = require('chalk');
module.exports = {
  info: (msg) => console.log(chalk.green('[INFO]'), msg),
  warn: (msg) => console.log(chalk.yellow('[WARN]'), msg),
  error: (msg) => console.log(chalk.red('[ERR]'), msg)
};
