// liron-shriki-325026375-guy-avisror-212843924

require('dotenv').config(); // Load environment variables
const express = require('express');
const db = require('./src/config/db'); // MongoDB connection
const app = express();

app.use(express.json());

const router = require('./src/routes');
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
