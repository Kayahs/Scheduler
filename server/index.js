import express from "express"
import cors from "cors"
import http from "http"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"

import postgres from "./config/postgres.js"
import { authUtil } from "./utils/index.js"
import typeDefs from "./schema.js"
import resolvers from "./resolvers.js"

const app = express()
const PORT = 8080
const env = process.argv[2]
const jwtSecret = process.argv[3]

app.set("JWT_SECRET", jwtSecret || "DEV_SECRET")
app.set("JWT_COOKIE_NAME", "token")

// Allow requests from server address
const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,POST"
}
app.set("CORS_CONFIG", corsConfig)

const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

app.use(
  "/graphql",
  cors(corsConfig),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      if (
        req.headers.referer === "http://localhost:8080/graphql" &&
        env !== "production"
      ) {
        app.set("SKIP_AUTH", true)
      } else {
        app.set("SKIP_AUTH", false)
      }
      return {
        app,
        req,
        postgres,
        authUtil
      }
    }
  })
)

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);