import './App.css';
import { ApolloClient, ApolloCache, ApolloProvider, InMemoryCache, useQuery } from "@apollo/client"
import DisplayData from './displayData';

function App() {

  const  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });


  return (
    <ApolloProvider client={client}>
        <div className='App'>
          <DisplayData />
        </div>
    </ApolloProvider>
    
  );
}

export default App;
