import { useState } from 'react'

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
      setPersons(persons.concat(newObject))
    }
  
    setNewName('')
    setNewNumber('')    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          search for names: <input value = {searchName} onChange = {handleSearchNameChange} />
      </div>
      
      <h2>Add new number</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons
            .filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
            .map(person => <p key = {person.name}> {person.name}: {person.number} </p>)
          }
        </div>
    </div>
  )
}

export default App