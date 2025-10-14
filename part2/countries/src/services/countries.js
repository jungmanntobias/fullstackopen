import axios from 'axios'
const baseurl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => (
    axios
        .get(`${baseurl}/all`)
        .then(response => response.data)
)

export default {getAll}