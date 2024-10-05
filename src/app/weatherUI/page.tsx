'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Head from 'next/head';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

export default function WeatherAPI() {
  const [City, setCity] = useState('');
  const [WeatherData, setWeatherData] = useState<any>(null);
  const [ForecastData, setForecastData] = useState<any>(null);

  const apikey = "feff206daa60b539abe8fae8f2ab7f29";
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
        console.log('fetch API', weatherUrl)
        try {
          const weatherResponse = await axios.get(weatherUrl);
          setWeatherData(weatherResponse.data);
          fetchForecastData(weatherResponse.data.name);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    }
  }, []);

  const fetchWeatherData = async (url: string) => {
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      fetchForecastData(response.data.name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastData = async (cityName: string) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}&units=metric`;
    try {
      const response = await axios.get(url);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const searchCityName = () => {
    if (City.trim() === '') return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}&units=metric`;
    fetchWeatherData(url);
    setCity('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getWeatherIconComponent = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clear':
        return <WiDaySunny size={48} color="#ffffff" />;
      case 'Clouds':
        return <WiCloudy size={48} color="#ffffff" />;
      case 'Rain':
        return <WiRain size={48} color="#ffffff" />;
      case 'Snow':
        return <WiSnow size={48} color="#ffffff" />;
      default:
        return <WiDaySunny size={48} color="#ffffff" />;
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Beautiful Weather App</title>
        <meta name="description" content="A beautiful weather app UI created with Next.js and SCSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {WeatherData ? (
          <div>
            <h1 className={styles.location}>{WeatherData.name}</h1>
            <p className={styles.country}>{WeatherData.sys.country}</p>
            <p className={styles.date}>
              <span className={styles.day}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })} 
              </span>
              <br />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div className={styles.temperature}>
              {Math.round(WeatherData.main.temp)}°C
            </div>
            <div className={styles.description}>
              {getWeatherIconComponent(WeatherData.weather[0].main)}
              {WeatherData.weather[0].description.charAt(0).toUpperCase() + WeatherData.weather[0].description.slice(1)}
            </div>
            <div className={styles.additional_info}>
              <div className={styles['info-item']}>
                <span className={styles.label}>Feels Like:</span>
                {Math.round(WeatherData.main.feels_like)}°C
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Min Temp:</span>
                {Math.round(WeatherData.main.temp_min)}°C
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Max Temp:</span>
                {Math.round(WeatherData.main.temp_max)}°C
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Humidity:</span>
                {WeatherData.main.humidity}%
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Pressure:</span>
                {WeatherData.main.pressure} hPa
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Visibility:</span>
                {WeatherData.visibility / 1000} km
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Cloud Coverage:</span>
                {WeatherData.clouds.all}%
              </div>
              {WeatherData.rain && WeatherData.rain['1h'] && (
                <div className={styles['info-item']}>
                  <span className={styles.label}>Rain Volume (last hour):</span>
                  {WeatherData.rain['1h']} mm
                </div>
              )}
              <div className={styles['info-item']}>
                <span className={styles.label}>Sunrise:</span>
                {formatTime(WeatherData.sys.sunrise)}
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Sunset:</span>
                {formatTime(WeatherData.sys.sunset)}
              </div>
              <div className={styles['info-item']}>
                <span className={styles.label}>Wind Speed:</span>
                {WeatherData.wind.speed} mph
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.loading}>Loading weather data...</p>
        )}

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={City}
            onChange={handleInput}
            className={styles.input}
          />
          <button onClick={searchCityName} className={styles.button}>Search</button>
        </div>
      </header>

      <section className={styles.forecast}>
        {ForecastData ? (
          ForecastData.list
            .filter((_: any, index: number) => index % 8 === 4)
            .map((forecast: any, index: number) => (
              <div key={index} className={styles['day-card']}>
                <div className={styles.day}>
                  {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                {getWeatherIconComponent(forecast.weather[0].main)}
                <div className={styles.temp}>{Math.round(forecast.main.temp)}°C</div>
                <div className={styles.details}>
                  <div className={styles.time}>
                    <span className={styles.label}>Morning</span>
                    <WiDaySunny className={styles.icon} style={{ color: '#f39c12' }} /> 
                    {Math.round(forecast.main.temp_max)}°C
                  </div>
                  <div className={styles.time}>
                    <span className={styles.label}>Afternoon</span>
                    <WiCloudy className={styles.icon} style={{ color: '#3498db' }} /> 
                    {Math.round(forecast.main.temp)}°C
                  </div>
                  <div className={styles.time}>
                    <span className={styles.label}>Evening</span>
                    <WiRain className={styles.icon} style={{ color: '#2ecc71' }} /> 
                    {Math.round(forecast.main.temp_min)}°C
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className={styles.loading}>Loading forecast data...</p>
        )}
      </section>
    </div>
  );
}
