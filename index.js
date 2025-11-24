require('dotenv').config();
const { startBaileys } = require('./src/lib/baileysClient');
const { initDB } = require('./src/db/mongo');

(async () => {
  try {
    await initDB(process.env.MONGO_URI);
  } catch(e) {
    console.warn('DB init failed (using JSON DB):', e.message || e);
  }

  const sock = await startBaileys();
  console.log('Fasha bot started. Scan QR if needed.');
})();
