import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Promise from "bluebird"

const saltRounds = 12

export default {
  Mutation: {
    async signup(
      parent,
      {
        input: { fullname, email, password }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const emailLowerCase = email.toString().toLowerCase()

        const newUserInsert = {
          text:
            "INSERT INTO jeopardy.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
          values: [fullname, emailLowerCase, hashedPassword]
        }

        const newUserResult = await postgres.query(newUserInsert)
        const user = newUserResult.rows[0]
        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
          "base64"
        )
        authUtil.setCookie({
          tokenName: app.get("JWT_COOKIE_NAME"),
          token: authUtil.generateToken(user, app.get("JWT_SECRET"), csrfToken),
          res: req.res
        })
        return {
          user,
          csrfToken
        }
      } catch (e) {
        if (e.constraint == "users_email_key") {
          return {
            error: {
              code: 401,
              message: "That email address is taken, please enter a new email."
            }
          }
        }
        console.log(e)
      }
    },
    async login(
      parent,
      {
        input: { email, password }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      const emailLowerCase = email.toString().toLowerCase()

      const getUser = {
        text: "SELECT * FROM jeopardy.users WHERE email=$1",
        values: [emailLowerCase]
      }

      const getUserResult = await postgres.query(getUser)
      const user = getUserResult.rows[0]
      if (!user) {
        return {
          error: {
            code: 401,
            message: "Email or Password is Invalid"
          }
        }
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        return {
          error: {
            code: 401,
            message: "Email or Password is Invalid"
          }
        }
      }

      const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
      const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
        "base64"
      )

      authUtil.setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token: authUtil.generateToken(user, app.get("JWT_SECRET"), csrfToken),
        res: req.res
      })

      return {
        user,
        csrfToken
      }
    },
    async logout(parent, {}, { app, req }) {
      const cookieName = app.get("JWT_COOKIE_NAME")
      req.res.clearCookie(cookieName)
      return true
    },
  }
}
