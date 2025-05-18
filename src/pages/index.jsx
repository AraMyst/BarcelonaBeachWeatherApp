import Head from 'next/head'
import { useState, useEffect } from 'react'
import fetchWeather from '../services/weatherService'
import ForecastCard from '../components/ForecastCard'

const BEACHES = [
  { label: 'Select a beach', value: '' },
  { label: 'Barceloneta',    value: 'barceloneta' },
  { label: 'Bogatell',       value: 'bogatell' },
  { label: 'Mar Bella',      value: 'mar-bella' },
  { label: 'Ocata',          value: 'ocata' },
  { label: 'Llevant',        value: 'llevant' }
]

export default function Home() {
  const [beach, setBeach] = useState('')
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    if (!beach) return
    loadForecast()
  }, [beach])

  async function loadForecast() {
    const data = await fetchWeather(beach)
    setForecast(data)
  }

  return (
    <>
      <Head>
        <title>Barcelona Beaches Weather</title>
        <meta name="description" content="7-day forecast for Barcelona beaches" />
      </Head>

      <div className="container">
        <h1>Barcelona Beaches Weather</h1>

        <div className="search-container">
          {/* Arrow pointing inward */}
          <span className="arrow left">→</span>
          <select
            className="select-box"
            value={beach}
            onChange={e => setBeach(e.target.value)}
          >
            {BEACHES.map(b => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <span className="arrow right">←</span>
        </div>

        {!beach && (
          <div className="placeholder-container">
            <img
              src="/images/select-beach-placeholder.png"
              alt="Please select a beach"
              className="placeholder-image"
            />
          </div>
        )}

        {beach && (
          <div className="forecast-list">
            {forecast.map((day, idx) => (
              <ForecastCard
                key={idx}
                beach={beach}
                {...day}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
