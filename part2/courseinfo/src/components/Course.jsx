const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {
      props.parts.map(part_i => <Part key = {part_i.id} part = {part_i}/>)
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const exercise_counts = props.parts.reduce((sum, part_i) => sum + part_i.exercises, 0)
  
  return (
    <p>
      <b>Number of exercises {exercise_counts}</b>
    </p>
  )
}

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
  </div>
)

export default Course