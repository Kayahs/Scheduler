export default {
  Query: {
    async getUsers(parent, args, { postgres }, info) {
      const getUsersQuery = {
        text: "SELECT * FROM scheduler.users"
      }
      
      const getUsersResult = await postgres.query(getUsersQuery)

      return getUsersResult.rows
    }
  }
}
