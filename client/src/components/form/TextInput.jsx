import { FormContext } from "lib/contexts"

const TextInput = ({id}) => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.options[id].label}
        <input
          type={data.options[id].type}
          name={data.options[id].name}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          value={data.values[id]}
        />
        {data.touched[id] && data.errors[id] && (
          <div>{data.errors[id]}</div>
        )}
      </div>
    )}
  </FormContext.Consumer>
)

export default TextInput