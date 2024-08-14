import { Pool } from "pg"

const postgres = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  database: "postgres",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

export default postgres
