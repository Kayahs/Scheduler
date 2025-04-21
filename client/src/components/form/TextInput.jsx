import { useContext } from "react"
import TextField from "@mui/material/TextField"

import { FormContext } from "lib/contexts"

const TextInput = ({id, className = ""}) => {
  const formData = useContext(FormContext)
  return (
    <TextField 
      id={id}
      className={className}
      label={formData.options[id].label}
      error={formData.touched[id] && formData.errors[id]}
      helperText={formData.touched[id] && formData.errors[id] ? formData.errors[id] : ""}
      type={formData.options[id].type}
      onChange={formData.handleChange}
      onBlur={formData.handleBlur}
      value={formData.values[id]}
      variant="outlined"
    />
  )
}


export default TextInput