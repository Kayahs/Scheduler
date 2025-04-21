import { useContext } from "react"
import Button from "@mui/material/Button"

import { FormContext } from "lib/contexts"

const SubmitButton = () => {
  const formData = useContext(FormContext)
  return (
    <Button variant="contained" type="submit" disabled={formData.isSubmitting}>
      {formData.options.submit.label}
    </Button>
  )
}

export default SubmitButton