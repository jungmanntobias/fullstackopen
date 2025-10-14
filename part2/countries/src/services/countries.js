import axios from 'axios'
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const weatherUrl = (lat, lon, api_key) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
}

const getAll = () => (
    axios
        .get(`${countryBaseUrl}/all`)
        .then(response => response.data)
)

const getWeather = (country, api_key) => {
    const lat_long = country.capitalInfo.latlng
    const lat = lat_long[0]
    const long = lat_long[1]

    console.log(`Fetching weather data for latitute ${lat} longitude ${long}`)

    return (
        axios
            .get(weatherUrl(lat, long, api_key))
            .then(response => response.data)
    )
}

export default {getAll, getWeather}