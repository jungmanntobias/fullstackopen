import { useState } from 'react'


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>  
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad

  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={((props.good - props.bad) / (total))} />
          <StatisticLine text="Positive" value={(props.good / total)} />
        </tbody>
      </table>
    ) 
  }
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
        <Button onClick = {() => setGood(good + 1)} text="Good" />
        <Button onClick = {() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick = {() => setBad(bad + 1)} text="Bad" />
      </div>

      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
}

export default App