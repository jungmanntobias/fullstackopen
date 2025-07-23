
const Button = (props) => {
  return
    <button onClick={props.handleClick}>
      {props.text}
    </button> 
}

const App = () => {
  return (
    <div>
      <h1>give feedback</h1>
      <p>Hello world</p>
    </div>
  )
}

export default App