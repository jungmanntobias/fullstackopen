const Filter = (props) => (
  <div>
    search for countries: <input value = {props.searchValue} onChange = {props.changeHandler} />
  </div>
)

export default Filter