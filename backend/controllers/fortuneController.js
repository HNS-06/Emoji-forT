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
  "you will tame a wild dragon using bubble tea.",
  "your socks will reveal the meaning of life... but only the left ones.",
  "a sentient avocado will appoint you as its royal advisor.",
  "you'll win an Olympic gold medal in competitive napping.",
  "your shadow will start giving you better life advice than your therapist.",
  "a family of raccoons will elect you as their midnight mayor.",
  "you'll discover your toaster has been writing poetry about you.",
  "tomorrow, clouds will form into your likeness and wave at you specifically.",
  "your pet (or a houseplant) will teach you the secret language of wind chimes.",
  "you'll receive a prophecy from a vending machine that only accepts bubblegum.",
  "a time-traveling waffle will ask for your help solving a syrup-related crime.",
  "your reflection will high-five you with important news from the mirror dimension.",
  "you'll be knighted by a squirrel for services to acorn conservation.",
  "all your pens will temporarily write in invisible ink for exactly 37 minutes.",
  "a passing UFO will compliment your hairstyle through interpretive dance.",
  "your next sneeze will accidentally summon a minor demigod of hiccups."
];

function getRandomInterpretation() {
  // Get random index and ensure it's different each time
  const randomIndex = Math.floor(Math.random() * randomInterpretations.length);
  return randomInterpretations[randomIndex];
}

function generateRandomEmojis(count = 3) {
  const shuffled = [...emojiList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

exports.getFortune = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const emojis = generateRandomEmojis();
    const interpretation = `${name}, ${getRandomInterpretation()} Here's your fortune: ${emojis.join(" ")}`;
    
    res.json({ 
      status: 'success',
      emojis, 
      interpretation 
    });
  } catch (error) {
    console.error("Error generating fortune:", error);
    res.status(500).json({ error: "Failed to generate fortune" });
  }
};