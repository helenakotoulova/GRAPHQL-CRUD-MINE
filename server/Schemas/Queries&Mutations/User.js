const graphql = require("graphql");
const { GraphQLInt, GraphQLString,GraphQLList } = graphql;

let userData = require("../../MOCK_DATA.json");

const UserType = require("../TypeDefs/UserType");
const MessageType = require("../TypeDefs/MessageType");

// QUERY
const GET_ALL_USERS = {
  // type nam rekne co ten query vraci.
  type: new GraphQLList(UserType),
  // arguments
  args: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    return userData; // chceme aby to returnovala vsechna nase data
  },
};

// MUTATIONS

const CREATE_USER = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    // pokud bychom meli databazi, tak by to zde bylo jinak, id by se nam vytvroilo primo z databaze.
    // tady si id musime udelat sami
    userData.push({
      id: userData.length + 1,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
    });
    return args;
  },
};

const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve(parent, args) {
    userData = userData.filter((user) => user.id !== args.id);
    return { successful: true, message: "User deleted" };
  },
};

const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  resolve(parent, args) {
    const existingUserIndex = userData.findIndex(
      (user) => user.email === args.email
    );
    const existingUser = userData[existingUserIndex];
    if (!existingUser) {
      //throw new Error('USERNAME DOES NOT EXIST!');
      return {successful:false, message: 'USERNAME DOES NOT EXIST!'}
    }
    if (args.oldPassword !==existingUser.password) {
      //throw new Error('PASSWORDS DO NOT MATCH!')
      return {successful:false, message: 'PASSWORDS DO NOT MATCH!'}
    }
    const updatedUser = { ...existingUser, password: args.newPassword };
    userData[existingUserIndex] = updatedUser;
    return { successful: true, message: "PASSWORD UPDATED" };
  },
};

module.exports = {
  GET_ALL_USERS,
  UPDATE_PASSWORD,
  DELETE_USER,
  CREATE_USER,
};
