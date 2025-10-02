const express = require('express');
const axios = require('axios'); // <--- usar axios
const router = express.Router();

router.get('/', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Informe latitude e longitude' });
  }

  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true
      }
    });

    const data = response.data;

    res.json({
      cidade: { lat, lon },
      atual: {
        temperatura: data.current_weather.temperature,
        vento: data.current_weather.windspeed,
        hora: data.current_weather.time
      }
    });
  } catch (err) {
    console.error('Erro ao buscar clima:', err.message);
    res.status(500).json({ error: 'Erro ao buscar clima' });
  }
});

module.exports = router;
