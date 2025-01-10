import { FormContext } from "lib/contexts"
import TextField from "@mui/material/TextField"

const TextInput = ({id, className = ""}) => (
  <FormContext.Consumer>
    {data => (
      <TextField 
        id={id}
        className={className}
        label={data.options[id].label}
        error={data.touched[id] && data.errors[id]}
        helperText={data.touched[id] && data.errors[id] ? data.errors[id] : ""}
        type={data.options[id].type}
        onChange={data.handleChange}
        onBlur={data.handleBlur}
        value={data.values[id]}
        variant="outlined"
      />
    )}
  </FormContext.Consumer>
)

export default TextInput