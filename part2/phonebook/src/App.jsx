import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const existingNames = persons.map(person => person.name.toLowerCase())

  // Event handler for submitting the name
  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {name: newName, number: newNumber, id : persons.length + 1}

    if (existingNames.includes(newObject.name.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newObject))}

    setNewName('')
    setNewNumber('')    
  }

  // Event handlers for changing values in input boxes
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleSearchNameChange = (event) => {setSearchName(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue = {searchName} changeHandler = {handleSearchNameChange}/>
      
      <h3>Add new number</h3>
      <PersonForm 
        submitHandler = {handleSubmit}
        newName = {newName}
        newNumber = {newNumber}
        nameChangeHandler = {handleNameChange}
        numberChangeHandler = {handleNumberChange}  
      />

      <h3>Numbers</h3>
      <Persons persons = {persons} searchName = {searchName} />
    </div>
  )
}

export default App