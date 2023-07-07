
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import { WiThermometer, WiStrongWind, WiHumidity } from 'react-icons/wi';
import '../App.css';

function WeatherComponent({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://us-central1-rise-and-shine-backend.cloudfunctions.net/gcp-func-rasb/weather/${city}`); // Update the API endpoint as needed
        setWeatherData(response.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data');
        setLoading(false);
        setWeatherData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="weather-component">
      {loading && <CircularProgress className="loader" />}
      {error && <Typography variant="body1" color="error" className="mt-3">{error}</Typography>}
      {weatherData && (
        <div className="mt-5">
          <Typography variant="h5" className="mb-4">Weather for {weatherData.location.name}</Typography>
          <div className="weather-info">
            <WiThermometer size={24} className="mr-2" />
            <Typography variant="body1" className="weather-text">
              Temperature: {weatherData.data.temp_c}°C ({weatherData.data.temp_f}°F)
            </Typography>
          </div>
          <div className="weather-info">
            <WiThermometer size={24} className="mr-2" />
            <Typography variant="body1" className="weather-text">
              Feels Like: {weatherData.data.feelslike_c}°C ({weatherData.data.feelslike_f}°F)
            </Typography>
          </div>
          <div className="weather-info">
            <WiStrongWind size={24} className="mr-2" />
            <Typography variant="body1" className="weather-text">
              Wind Speed: {weatherData.data.wind_kph} km/h ({weatherData.data.wind_mph} mph)
            </Typography>
          </div>
          <div className="weather-info">
            <WiHumidity size={24} className="mr-2" />
            <Typography variant="body1" className="weather-text">Humidity: {weatherData.data.humidity}%</Typography>
          </div>
          <div className="weather-info">
            <img src={weatherData.data.condition.icon} alt={weatherData.data.condition.text} size={24} className="weather-icon" />
            <Typography variant="body1" className="weather-text">
              {weatherData.data.condition.text}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}


export default WeatherComponent;


/* import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { WiCelsius, WiStrongWind, WiHumidity } from 'react-icons/wi';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeatherComponent() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
      
    const fetchWeatherData = () => {
        axios
          .get(`https://us-central1-rise-and-shine-backend.cloudfunctions.net/gcp-func-rasb/weather/${city}`)
          .then(response => {
            setWeatherData(response.data);
            setError('');
          })
          .catch(error => {
            setWeatherData(null);
            console.log(error);
            setError('Invalid city');
          });
      };
  
    const handleSubmit = e => {
      e.preventDefault();
      const sanitizedCity = city.trim(); 
  
      if (sanitizedCity) {
        setCity(sanitizedCity);
        fetchWeatherData();
      }
    };
  
    return (
            <Container maxWidth="sm" className="mt-5">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  variant="outlined"
                  fullWidth
                  className="mb-3"
                />
                <Button type="submit" variant="contained" size="large">
                  Get Weather
                </Button>
              </form>
        
              {error && <Typography variant="body1" color="error" className="mt-3">{error}</Typography>}
        
              {weatherData && (
                <div className="mt-5">
                  <Typography variant="h5" className="mb-4">Weather for {weatherData.location.name}</Typography>
                  <div className="d-flex align-items-center mb-3">
                    <WiCelsius size={24} className="mr-2" />
                    <Typography variant="body1">
                      Temperature: {weatherData.data.temp_c}°C ({weatherData.data.temp_f}°F)
                    </Typography>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <WiCelsius size={24} className="mr-2" />
                    <Typography variant="body1">
                      Feels Like: {weatherData.data.feelslike_c}°C ({weatherData.data.feelslike_f}°F)
                    </Typography>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <WiStrongWind size={24} className="mr-2" />
                    <Typography variant="body1">
                      Wind Speed: {weatherData.data.wind_kph} km/h ({weatherData.data.wind_mph} mph)
                    </Typography>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <WiHumidity size={24} className="mr-2" />
                    <Typography variant="body1">Humidity: {weatherData.data.humidity}%</Typography>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <img src ={weatherData.data.condition.icon} alt={weatherData.data.condition.text} size={24}/>
                    <Typography variant="body1">
                        {weatherData.data.condition.text}
                    </Typography>
                  </div>
                </div>
              )}
            </Container>
          );
  }
 */ 
  