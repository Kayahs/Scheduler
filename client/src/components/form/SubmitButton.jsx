import { FormContext } from "lib/contexts"

const SubmitButton = () => (
  <FormContext.Consumer>
    {data => (
      <button type="submit" disabled={data.isSubmitting}>
        {data.options.submit.label}
      </button>
    )}
  </FormContext.Consumer>
)

export default SubmitButton