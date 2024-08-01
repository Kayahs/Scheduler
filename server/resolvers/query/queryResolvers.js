export default {
  Query: {
    async getEvents(parent, args, { postgres }, info) {
      const getQuizzesQuery = {
        text: "SELECT * FROM scheduler.events"
      }

      return [{
        id: 1,
        title: "test",
        complete: true
      }]
      const getEventsResult = await postgres.query(getQuizzesQuery)

      return getEventsResult.rows
    }
  }
}
