import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '38341d1da7d9b5c4bbf6e504ce0ea99e'
    const difkelvin = 273.15 // para lograr obtener grados celsious debemos restar este numero a los grados kelvin

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            console.log(data)
            setWeatherData(data)
        } catch (error) {
            console.log('Ha habido un error: ', error)
        }
    }

    const handlecityChange = (event) => {
        setCity(event.target.value)
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
        console.log(city)
    }

    return (
        <div className="container">
            <h1>Aplicación del clima</h1>
            <form onSubmit={handleSubmit} >

                <input
                    type="text"
                    placeholder="Ingresar una ciudad"
                    value={city}
                    onChange={handlecityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {weatherData && (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es {Math.floor(weatherData.main.temp - difkelvin)}°C</p>
                    <p>La condición meteorológica actual: {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                </div>
            )}


        </div>

    )
}

export default WeatherApp;