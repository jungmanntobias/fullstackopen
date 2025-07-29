import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad

  return (
    <div>
      <h1>Statistics</h1>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {total}</p>
      <p>Average: {((props.good - props.bad) / (total))}</p>
      <p>Positive: {props.good / total} </p>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <button onClick = {() => setGood(good + 1)}>Good</button>
        <button onClick = {() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick = {() => setBad(bad + 1)}>Bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App