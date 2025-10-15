const Filter = (props) => (
  <div>
    search for names: <input value = {props.searchValue} onChange = {props.changeHandler} />
  </div>
)

export default Filter