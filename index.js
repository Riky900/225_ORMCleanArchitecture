require('dotenv').config();
const express = require('express');
const komikRoutes = require('./routes/komikRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Komik berjalan' });
});

app.use('/', komikRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});