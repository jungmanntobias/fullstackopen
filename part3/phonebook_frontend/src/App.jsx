import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import numberService from './services/numbers'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  // Event handler for submitting the name
  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {name: newName, number: newNumber}
    const foundPerson = persons.find(person => person.name === newObject.name)

    if (foundPerson) {
      // replace existing number if the user wants
      if (window.confirm(`${newObject.name} is already added to the phonebook. Replace the old number with a new one?`)) {
        const id = foundPerson.id
        const changedPerson = {...foundPerson, number: newNumber}
        //console.log(id)

        numberService.replace(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === id ? response : person))
          })
          .catch(error => {
            console.log(error.response.data.error)
            setNotificationColor('red')
            setNotificationMessage(error.response.data.error)
          })
      }
      // alert(`${newName} is already added to phonebook`)
    } else {
      numberService
        .create(newObject)
        .then(returnedObject => setPersons(persons.concat(returnedObject)))
        .catch(error => {
          console.log(error.response.data.error)
          setNotificationColor('red')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => setNotificationMessage(null), 5000)
        })
      setNotificationMessage(`Added ${newName}`)
      setNotificationColor('green')
      setTimeout(() => setNotificationMessage(null), 5000)
    }
    setNewName('')
    setNewNumber('')    
  }

  // Event handler for deleting numbers
  const handleNumberDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      const delete_id = event.target.id
      // console.log("deleting", delete_id)
      numberService
        .deleteNumber(delete_id)
        .catch(() => {
          setNotificationMessage(`Information of ${event.target.name} has already been removed from the server`)
          setNotificationColor('red')
          setTimeout(() => setNotificationMessage(null), 5000)
        })
      setPersons(persons.filter(person => person.id !== delete_id))
    }
  }

  // Event handlers for changing values in input boxes
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleSearchNameChange = (event) => {setSearchName(event.target.value)}
  
  // Fetch initial state from server
  useEffect(() => {
    numberService
      .getAll()
      .then(returnedObjects => {setPersons(returnedObjects)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue = {searchName} changeHandler = {handleSearchNameChange}/>
      <Notification message={notificationMessage} color = {notificationColor}/>
      
      <h3>Add new number</h3>
      <PersonForm 
        submitHandler = {handleSubmit}
        newName = {newName}
        newNumber = {newNumber}
        nameChangeHandler = {handleNameChange}
        numberChangeHandler = {handleNumberChange}  
      />

      <h3>Numbers</h3>
      <Persons persons = {persons} searchName = {searchName} deleteHandler = {handleNumberDelete}/>
    </div>
  )
}

export default App