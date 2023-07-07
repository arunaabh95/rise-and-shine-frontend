import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import '../App.css';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';

function ForecastComponent({ city }) {
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://us-central1-rise-and-shine-backend.cloudfunctions.net/gcp-func-rasb/forecast/${city}`); // Update the API endpoint as needed
        setForecastData(response.data.data);
        setLoading(false);
      } catch (error) {
        setForecastData({});
        setLoading(false);
      }
    };

    if (city) {
      fetchForecastData();
    }
  }, [city]);

  return (
    <div className="forecast-component">
    {console.log(forecastData)}
      {loading && <CircularProgress className="loader" />}
      {forecastData && forecastData.length && forecastData.map((day, index) => (
        <Card key={index} className="forecast-card">
          <CardContent>
            <Typography variant="h6" component="h2">{day.date}</Typography>
            <img src={day.day.condition.icon} alt="Weather Icon" className="weather-icon" />
            <Typography variant="body2" component="p">Temperature: {day.day.avgtemp_c}°C / {day.day.avgtemp_f}°F</Typography>
            <Typography variant="body2" component="p">Feels like: {day.day.avgfeelslike_c}°C / {day.day.avgfeelslike_f}°F</Typography>
            <Typography variant="body2" component="p">Wind Speed: {day.day.maxwind_kph} km/h / {day.day.maxwind_mph} mph</Typography>
            <Typography variant="body2" component="p">Humidity: {day.day.avghumidity}%</Typography>
            {/* Additional forecast data */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ForecastComponent;
