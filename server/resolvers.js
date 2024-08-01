import queryResolvers from "./resolvers/query/queryResolvers.js"
import mutationResolvers from "./resolvers/mutation/mutationResolvers.js"

export default {
  ...queryResolvers,
  ...mutationResolvers
}
