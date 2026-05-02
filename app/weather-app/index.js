require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.OPENWEATHER_API_KEY;
const city = "Manila";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const res = await axios.get(url);
    console.log("Weather Data:", res.data);
  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
  }
}

getWeather();