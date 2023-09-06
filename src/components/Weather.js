import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '0fe5114d3f8e421f8e248a4309be88d6';
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = (query) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          console.error('Error fetching weather data');
          throw new Error('Error fetching weather data');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data', error);
      });
  };

  return (
    <div>
      <h1>City Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        className="search"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => fetchWeatherData(city)}>Get Weather</button>
      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default Weather;


