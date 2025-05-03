const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Error al contactar a ChatGPT.' });
  }
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
