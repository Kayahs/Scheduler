import Button from "@mui/material/Button"

import { FormContext } from "lib/contexts"

const SubmitButton = () => (
  <FormContext.Consumer>
    {data => (
      <Button variant="contained" type="submit" disabled={data.isSubmitting}>
        {data.options.submit.label}
      </Button>
    )}
  </FormContext.Consumer>
)

export default SubmitButton