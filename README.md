# 🏖️ Barcelona Beach Weather App

View a **7‑day forecast** for Barcelona’s five most popular beaches – right in your browser. Built with **Next.js** (pages router) and **React 19**, the app pulls open data from **Open‑Meteo** and decorates it with custom beach‑specific icons.


> **Live demo →** https://barcelona-beach-weather-app.vercel.app/

---

## ✨ Features

|                                 |                                                                       |
| ------------------------------- | --------------------------------------------------------------------- |
| 🏝 **Five preset beaches**      | Barceloneta, Bogatell, Mar Bella, Ocata & Llevant.                    |
| 🗓 **7‑day outlook**            | Daily cards show date, summary, max/min temperature & wind speed.     |
| 🎨 **Custom icons**             | Condition‑specific PNGs per beach folder under `/public/images/`.     |
| 🚫 **No selection placeholder** | Full‑screen illustration prompts users to pick a beach.               |
| 📱 **Responsive design**        | Blue background with tidy white cards, scales from mobile to desktop. |
| ⚡ **Pure client fetch**         | Uses the free, key‑less Open‑Meteo REST API with predefined lat/lon.  |

---

## 🛠 Tech Stack

| Layer     | Technology                   | Purpose / Notes                            |
| --------- | ---------------------------- | ------------------------------------------ |
| Framework | **Next.js 15 (pages)**       | `pages/` router, automatic code‑splitting. |
| UI        | **React 19**                 | Hooks for state & effects.                 |
| Styling   | **CSS Modules + global CSS** | Scoped component styles & base layout.     |
| Data      | **Open‑Meteo API**           | Free, unauthenticated weather data.        |
| Hosting   | **Vercel** *(recommended)*   | Zero‑config deploy for Next.js apps.       |

---

## 🗂 Project Structure

```
BarcelonaBeachApp/
├── public/
│   └── images/            # beach‑specific icon sets + placeholder
├── src/
│   ├── components/
│   │   ├── ForecastCard.jsx
│   │   └── ForecastCard.module.css
│   ├── constants/
│   │   └── beachCoordinates.js
│   ├── pages/
│   │   ├── _app.js        # global CSS import
│   │   └── index.jsx      # main page (beach selector + forecast grid)
│   ├── services/
│   │   └── weatherService.js
│   └── styles/
│       └── globals.css
├── .gitignore
└── package.json
```
