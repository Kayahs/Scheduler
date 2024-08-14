import pg from "pg"
import squel from "squel"
import config from "../config/default.json" with { type: "json" }

const psquel = squel.useFlavour("postgres");
const { Pool } = pg

const userSeeds = [
  {
    fullname: "Akshay Manchanda",
    email: "akshay@akshay.com",
    password: "$2a$12$9ViOGmMRWeUG.6o.GTRyX.ZFzVCZoHg.v7r0mErpBMIDua7.wcIdC"
  }
]

const seed = async () => {
  const pgConn = await new Pool(config.db).connect()

  try {
    await pgConn.query("BEGIN")

    console.log("Seeding Users...")

    await Promise.all(
      userSeeds.map(userSeed =>
        pgConn.query(psquel
          .insert()
          .into("scheduler.users")
          .setFields(userSeed)
          .toParam()
        )
      )
    )

    console.log("Seeding Users... [DONE]")

    await pgConn.query("COMMIT")
  } catch (e) {
    await pgConn.query("ROLLBACK")
    throw e
  } finally {
    pgConn.release()
  }
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
