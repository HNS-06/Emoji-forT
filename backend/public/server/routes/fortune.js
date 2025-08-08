const express = require('express');
const router = express.Router();
const geminiClient = require('../geminiClient');

router.post('/', async (req, res) => {
  const { name, personality, emojis } = req.body;

  const prompt = `
You are a quirky fortune teller that speaks only in weird and funny prophecies made of emojis. 
The person's name is ${name}, and their personality is: ${personality}. 
Use these emojis to generate a weird and funny fortune: ${emojis.join(' ')}.
Keep it under 3 lines and make it entertaining.
`;

  const interpretation = await geminiClient(prompt);
  res.json({ fortune: interpretation });
});

module.exports = router;
