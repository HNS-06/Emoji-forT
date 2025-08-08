// backend/controllers/fortuneController.js

const emojiList = ['🌈', '✨', '🔥', '🦄', '🌻', '💫', '💖', '🍀', '🧿', '🌙', '🍕', '🎯'];

const randomInterpretations = [
  "you will meet a talking parrot that knows your secrets.",
  "a pizza-shaped comet will bless your day.",
  "you'll discover your hidden talent for time travel... but only on Tuesdays.",
  "a rainbow unicorn will guide you to your destiny.",
  "you are destined to dance with a disco ghost at midnight.",
  "you will unlock a magical door using laughter.",
  "you'll invent a language spoken only by cats.",
  "today is the day you find treasure in your laundry.",
  "an ancient emoji scroll will reveal your next move.",
  "you will tame a wild dragon using bubble tea."
];

function generateRandomEmojis(count = 3) {
  const emojis = [];
  while (emojis.length < count) {
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    if (!emojis.includes(emoji)) {
      emojis.push(emoji);
    }
  }
  return emojis;
}

function generateInterpretation(name, emojis) {
  const message = randomInterpretations[Math.floor(Math.random() * randomInterpretations.length)];
  return `${name}, ${message} Here’s your fortune: ${emojis.join(" ")}`;
}

exports.getFortune = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const emojis = generateRandomEmojis();
  const interpretation = generateInterpretation(name, emojis);

  res.json({ emojis, interpretation });
};
