const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; // fallback in case .env is missing

function Airline_Auth() {
  app.listen(PORT, () => {
    console.log(`Successfully started at PORT: ${PORT}`);
  });
}

Airline_Auth();
