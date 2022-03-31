const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;
//const GET_ALL_USERS = require("../Schemas/Queries/User");
const {GET_ALL_USERS,CREATE_USER,UPDATE_PASSWORD,DELETE_USER} = require("./Queries&Mutations/User");

// root query je main query.
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  // fields represent different queries - napr. getAllUsers, getUserById
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

// mutation are for creating, deleting and updating data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
