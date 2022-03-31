// IMPORT JEDNOTLIVYCH VECI
const express = require("express"); // pomoci toho require importuju ty dane veci.
const app = express();
const PORT = 4004;
const schema = require("./Schemas/index");
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql");

app.use(cors());
app.use(express.json());

// CREATING SERVER
// vytvorime endpoint - graphql ma jen jeden endpoint nazvany '/graphql'
app.use(
  "/graphql",
  graphqlHTTP({
    schema, // jde o kombinaci mutations and queries (queries - dotazy, tzn. get statements, mutations = create, delete, update statements) (dohromady CRUD)
    graphiql: true, // je to gui, ktere vizualizuje nase queries, ujednodusuje praci s graphql
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});

/*
The simplest way to run a GraphQL API server is to use Express, a popular web application framework for Node.js. You will need to install two additional dependencies:
npm install express express-graphql graphql --save

query {
  getAllUsers { 
    id
    firstName
    lastName
    email
    password
  }
}

mutation {
  updateUser(email:"test4@gmail.com", oldPassword:"blabla4",newPassword:"newPass4") {
    successful
    message
  }
}

mutation {
  deleteUser(id:2) {
    successful
    message
  }
}

mutation {
  createUser(firstName:"Pedro", lastName:"Machado", email: "test@gmail.com", password: "test") {
    // tohle je ta return fce, chceme aby nam to pak zobrazilo pro toho daneho uzivatele nasledujici veci
    firstName
    lastName
    email
  }
}
*/