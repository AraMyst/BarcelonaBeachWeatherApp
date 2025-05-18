// src/components/ForecastCard.jsx
import React from 'react';
import styles from './ForecastCard.module.css';

// Mapping of condition keys to image paths under /public/images/{beach}/
const conditionImages = {
  clear: beach => `/images/${beach}/clear.png`,
  cloudy: beach => `/images/${beach}/cloudy.png`,
  fog: beach => `/images/${beach}/fog.png`,
  rain: beach => `/images/${beach}/rain.png`,
  thunder: beach => `/images/${beach}/thunder.png`,
};

export default function ForecastCard({
  beach,
  date,
  summary,
  tempMax,
  tempMin,
  windSpeed,
  condition
}) {
  // Format date like "Tue, May 13"
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  // Decide which key to use for the image
  const key = (() => {
    const c = (condition || summary || '').toLowerCase();
    if (c.includes('thunder') || c.includes('storm')) return 'thunder';
    if (c.includes('rain')) return 'rain';
    if (c.includes('cloud')) return 'cloudy';
    if (c.includes('fog') || c.includes('mist')) return 'fog';
    return 'clear';
  })();

  // Build image src
  const imgSrc = conditionImages[key](beach);

  return (
    <div className={styles.card}>
      <img src={imgSrc} alt={condition} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.summary}>{summary}</div>
        <div className={styles.maxTemp}>
          Max: {Math.round(tempMax)}°C
        </div>
        <div className={styles.minTemp}>
          Min: {Math.round(tempMin)}°C
        </div>
        <div className={styles.wind}>
          Wind: {windSpeed.toFixed(1)} m/s
        </div>
      </div>
    </div>
  );
}
