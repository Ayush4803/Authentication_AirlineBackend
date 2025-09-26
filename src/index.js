const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import main routes
const routes = require('./routes');
app.use('/api', routes);   // all routes prefixed with /api

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at PORT: ${PORT}`);
});
