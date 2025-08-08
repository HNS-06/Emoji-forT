const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
const fortuneRoutes = require('./routes/fortuneRoutes');
app.use('/api', fortuneRoutes);  // This makes /api/fortune available

app.get('/', (req, res) => {
  res.send('🎉 Emoji Fortune Teller Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
