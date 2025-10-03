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

// const Total = (props) => (
//   const exercise_counts = props.parts.reduce(part_i => part_i.exercises)
  

//   return (
//     <p>
//       Number of exercises {}
//     </p>
//   )
// )

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
  // {/* <Total parts={course.parts}/> */}
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


  return <Course course={course} />
}

export default App