import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  // Event handler for submitting the name
  const handleSubmit = (event) => {
    event.preventDefault()

    const nameObject = {name: newName}

    const existingNames = persons.map(person => person.name)

    if (existingNames.includes(nameObject.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    
    setNewName('')    
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value = {newName} onChange = {handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          {persons.map(person => <p key = {person.name}> {person.name} </p>)}
        </div>
    </div>
  )
}

export default App