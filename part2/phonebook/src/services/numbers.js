import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => (
    axios
        .get(baseurl)
        .then(response => response.data)
)

const create = newObject => (
    axios
        .post(baseurl, newObject)
        .then(response => response.data)
)

const deleteNumber = (id) => {
    axios
        .delete(`${baseurl}/${id}`)
}

export default {create, getAll, deleteNumber}