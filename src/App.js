import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
// pro detekovani erroru v nasem api
import { onError } from "@apollo/client/link/error";

import GetUsers from "./Components/GetUsers";
import Form from "./Components/Form";
import ChangePassword from "./Components/ChangePassword";

// error catching system
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error: ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "http://localhost:4004/graphql",
  }),
]);

const client = new ApolloClient({
  //uri:"http://localhost:4004/graphql",
  link: link,
  cache: new InMemoryCache(),
  //fetchOptions: { mode: "no-cors" },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1 style={{fontFamily:'inherit', margin:'1rem auto 0', width:'fit-content'}}>Our Users!</h1>
      <Form />
      <GetUsers />
      <ChangePassword />
    </ApolloProvider>
  );
}

export default App;
