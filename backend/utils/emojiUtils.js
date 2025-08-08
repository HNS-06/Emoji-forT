// backend/utils/emojiUtils.js
const emojiPool = ['🍕', '🦄', '🌈', '💫', '👽', '🐉', '🎩', '🧚‍♀️', '🌻', '🧿', '✨', '🔥'];
const personalityTypes = ['Chaotic', 'Silly', 'Magical', 'Spicy', 'Lucky', 'Cursed', 'Spacey'];

function generateRandomEmojiFortune(name, personality = 'Silly') {
  const emojis = [];
  while (emojis.length < 3) {
    const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
    if (!emojis.includes(emoji)) emojis.push(emoji);
  }

  const interpretation = `🧠 ${name} (${personality}) is destined for a wild journey involving ${emojis.join(' ')}. Buckle up!`;
  return { emojis, interpretation };
}

module.exports = {
  generateRandomEmojiFortune,
  emojiPool,
  personalityTypes,
};
