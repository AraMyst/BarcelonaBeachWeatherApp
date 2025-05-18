// src/services/weatherService.js

import { BEACH_COORDS } from '../constants/beachCoordinates'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'
const TIMEZONE = 'Europe/Madrid'

/**
 * Fetch 7-day daily forecast for a given beach key.
 * Returns an array of:
 *   { date, summary, tempMax, tempMin, windSpeed, code }
 */
export default async function fetchWeather(beachKey) {
  const coords = BEACH_COORDS[beachKey]
  if (!coords) {
    throw new Error(`Unknown beach "${beachKey}"`)
  }
  const { lat: latitude, lon: longitude } = coords

  const dailyFields = [
    'weathercode',
    'temperature_2m_max',
    'temperature_2m_min',
    'windspeed_10m_max'
  ].join(',')

  const url = `${BASE_URL}` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&daily=${dailyFields}` +
    `&timezone=${encodeURIComponent(TIMEZONE)}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`)
  }
  const data = await res.json()

  return data.daily.time.map((date, i) => ({
    date,                                           // e.g. "2025-05-18"
    summary: mapWeatherCodeToDescription(data.daily.weathercode[i]),
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    windSpeed: data.daily.windspeed_10m_max[i],
    code: data.daily.weathercode[i]                 // numerical weather code
  }))
}

/**
 * Map Open-Meteo weather codes to human-readable summary
 */
function mapWeatherCodeToDescription(code) {
  const descriptions = {
    0:  'Clear sky',
    1:  'Mainly clear',
    2:  'Partly cloudy',
    3:  'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snowfall',
    73: 'Moderate snowfall',
    75: 'Heavy snowfall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  }
  return descriptions[code] || 'Unknown'
}
