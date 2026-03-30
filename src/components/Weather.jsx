import React, { useState } from 'react';
import search from '../assets/search.png';
import clear from '../assets/clear.png';
import rain from '../assets/rain.png';
import cloudy from '../assets/cloud.png';
import snow from '../assets/snow.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';

const Weather = () => {
  const key = "e1c83a796625459aa1f130209262303";

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError("Please enter a city");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError("Failed to fetch weather");
      setWeather(null);
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return clear;
    const lower = weather.current.condition.text.toLowerCase();
    if (lower.includes("sun") || lower.includes("clear")) return clear;
    if (lower.includes("rain")) return rain;
    if (lower.includes("cloud")) return cloudy;
    if (lower.includes("snow")) return snow;
    return clear;
  };

  return (
    <div className="container">
      <div className="input-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <img src={search} alt="Search" onClick={fetchWeather} />
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <img src={getWeatherIcon()} alt="Weather Icon" className="icon" />

          <div className="info">
            <h2>{weather.location.name}</h2>
            <p>{weather.current.temp_c}°C</p>
          </div>

          <div className="info-2">
            <div className="col">
              <img src={humidity} alt="Humidity" />
              <span>{weather.current.humidity}%</span>
            </div>

            <div className="col">
              <img src={wind} alt="Wind" />
              <span>{weather.current.wind_kph} km/h</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;