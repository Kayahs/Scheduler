import { useMutation } from "@apollo/client"
import { LOGOUT_MUTATION } from "gql/mutations"
import Button from "@mui/material/Button"

const Logout = () => {
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION)
  return (
    <div>
      <Button variant="contained" onClick={logout}>Logout</Button>
    </div>
  )
}

export default Logout
