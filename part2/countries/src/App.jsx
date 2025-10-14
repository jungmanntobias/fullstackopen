import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  // Event handlers for changing values in input boxes
  const handleSearchChange = (event) => {setSearchValue(event.target.value)}
  const clickHandler = (event) => {setSearchValue(event.target.value)}
  
  // Fetch initial state from server
  useEffect(() => {
    countryService
      .getAll()
      .then(returnedObjects => {
        setCountries(returnedObjects)
      })
  }, [searchValue])

  return (
    <div>
      <Filter searchValue = {searchValue} changeHandler = {handleSearchChange}/>
      <Countries
        countries = {countries}
        searchValue = {searchValue}
        clickHandler={clickHandler}
        api_key = {api_key}
      />
    </div>
  )
}

export default App