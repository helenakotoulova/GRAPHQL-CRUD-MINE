const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = graphql;

// nase Mock data obsahuji ruzne uzivatele, vytvorime tedy userType
const UserType = new GraphQLObjectType({
    name: "User",
    // zde ten field bude funkce - to v podstate rika, co nam ten typ vraci
    fields: () => ({
      id: { type: GraphQLInt },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    }),
  });

module.exports = UserType;
