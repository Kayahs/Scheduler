import express from "express"
import cors from "cors"
import chalk from "chalk"
import path from "path"
import http from "http"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"

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
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,POST"
}
app.set("CORS_CONFIG", corsConfig)

// Allow requests from dev server address
// app.use(cors(corsConfig))

const httpServer = http.createServer(app)

const server = new ApolloServer({
  context: ({ req }) => {
    if (
      req.headers.referer === "http://localhost:8080/graphql" &&
      process.env.NODE_ENV !== "production"
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
  },
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

app.use(
  "/graphql",
  cors(corsConfig),
  express.json(),
  expressMiddleware(server)
)

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

/*
if (env !== "development") {
  if (!jwtSecret) {
    console.error("Need to set a secret while running in a production environment.")
    process.exit(-1)
    }
    const root = path.resolve(__dirname, "../client")
    
    // Serve the static front-end from /public when deployed
    app.use(express.static(root))
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}




apolloServer.applyMiddleware({
  app,
  uploads: true,
  cors: corsConfig
})

let server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`>> ${chalk.blue("Express running:")} http://localhost:${PORT}`)

  console.log(
    `>> ${chalk.magenta(
      "GraphQL playground:"
    )} http://localhost:${PORT}/graphql`
  )
})

server.on("error", err => {
  console.log(err)
})
  */