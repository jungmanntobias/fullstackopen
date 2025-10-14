
import { useState, useEffect } from 'react'
import countryService from '../services/countries'
import axios from 'axios'

const CountryDetails = ({country}) => {
  // console.log(country.languages.keys)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <div>
          {Object.values(country.languages).map(language => <p key = {language}>{language}</p>)}
        </div>
        <img src = {country.flags.png}></img>
      </div>
    </div>
  )
}

const CountryList = ({countries, clickHandler}) => {
  return (
    <div>
        {countries.map(country =>
          <div key = {country.name.common}>
            <p>{country.name.common} <button value = {country.name.common} onClick={clickHandler}>Show</button> </p>
          </div>
        )}
    </div>
  )
}

const Weather = ({country, api_key}) => {
  
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getWeather(country, api_key)
      .then(weather => setWeather(weather))
  }, [country.name.common])

  if (weather) {
    // console.log(weather.weather[0].icon)
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <p>Wind {weather.wind.speed.toFixed(2)} m/s</p>
      </div>
    )
  }
  
}

const Countries = (props) => {
  const matchingCountries = props.countries.filter(country => country.name.common.toLowerCase().includes(props.searchValue.toLowerCase()))

  if (matchingCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (matchingCountries.length > 1) {
    return (
      <div>
        <CountryList countries = {matchingCountries} clickHandler={props.clickHandler} />
      </div>
    )
  } else if (matchingCountries.length === 1) {
    const country = matchingCountries[0]
    // console.log(country.languages.keys)
    return (
      <div>
        <CountryDetails country ={country} />
        <Weather country={country} api_key = {props.api_key} />
      </div>
    )
  }
}
//<button id={country.id} name={country.name} onClick={props.viewHandler}>View</button>
export default Countries