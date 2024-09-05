import { useMutation } from "@apollo/client"
import { LOGOUT_MUTATION } from "gql/mutations"

const Logout = () => {
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION)
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout
