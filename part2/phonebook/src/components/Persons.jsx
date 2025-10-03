const Persons = (props) => (
    <div>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))
        .map(person => <p key = {person.name}> {person.name}: {person.number} </p>)}
    </div>
)

export default Persons