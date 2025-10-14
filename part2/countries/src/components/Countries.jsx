
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

const CountryList = ({countries}) => {
  return (
    <div>
        {countries.map(country =>
          <div key = {country.name.common}>
            <p>{country.name.common} <button>Show</button> </p>
            
          </div>
        )}
    </div>
  )
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
        <CountryList countries = {matchingCountries} />
      </div>
    )
  } else if (matchingCountries.length === 1) {
    const country = matchingCountries[0]
    // console.log(country.languages.keys)
    return (
      <div>
        <CountryDetails country ={matchingCountries[0]} />
      </div>
    )
  }
}
//<button id={country.id} name={country.name} onClick={props.viewHandler}>View</button>
export default Countries