const axios = require('axios');
module.exports = {
  async simpleChat(prompt) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY missing');
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    }, { headers: { Authorization: `Bearer ${key}` }});
    return res.data;
  }
};
