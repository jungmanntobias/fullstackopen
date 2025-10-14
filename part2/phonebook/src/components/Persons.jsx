const Persons = (props) => (
    <div>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))
        .map(person => <p key = {person.name}> {person.name}: {person.number} <button id={person.id} name={person.name} onClick={props.deleteHandler}>delete</button> </p>)}
    </div>
)

export default Persons