const emojiList = ['🌈', '✨', '🔥', '🦄', '🌻', '💫', '💖', '🍀', '🧿', '🌙', '🍕', '🎯'];

async function getFortune() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/fortune', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (!data || !data.emojis || !data.interpretation) {
      throw new Error("Invalid response from server");
    }

    const fortuneEl = document.getElementById("fortuneOutput");
    fortuneEl.innerHTML = `
      <div class="fortune-emojis">${data.emojis.join(" ")}</div>
      <div class="fortune-text">🌟 ${data.interpretation}</div>
    `;

    document.getElementById("shareBtn").style.display = "inline-block";
    startEmojiRain(data.emojis);
  } catch (error) {
    console.error("Error fetching fortune:", error);
    document.getElementById("fortuneOutput").innerText = "⚠️ Failed to fetch your fortune.";
  }
}

function shareFortune() {
  const text = document.getElementById("fortuneOutput").innerText;

  if (navigator.share) {
    navigator.share({
      title: "My Emoji Fortune",
      text,
      url: window.location.href,
    }).catch(err => console.error("Share failed:", err));
  } else {
    alert("Sharing is not supported on this browser.");
  }
}

function startEmojiRain(emojis) {
  const rainContainer = document.querySelector(".emoji-rain");
  rainContainer.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("div");
    emoji.className = "rain-emoji";
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animation = `fall ${3 + Math.random() * 3}s linear infinite`;
    emoji.style.fontSize = `${24 + Math.random() * 24}px`;
    emoji.style.top = "-50px";
    rainContainer.appendChild(emoji);
  }
}

function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("nameInput").value = transcript;
    getFortune();
  };

  recognition.onerror = function (event) {
    console.error("Voice input error:", event);
  };
}

// Inject styles and animation
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fall {
    0% { top: -50px; opacity: 0; }
    30% { opacity: 1; }
    100% { top: 110vh; opacity: 0; }
  }

  .rain-emoji {
    pointer-events: none;
    z-index: 1000;
  }

  .fortune-emojis {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .fortune-text {
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 0.5rem;
    color: #222;
  }
`;
document.head.appendChild(style);
