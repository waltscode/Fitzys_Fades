// Bringing in the required import from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import backgroundImage from '/images/fitzshop.jpg'
import { AuthProvider } from '../src/utils/authContext';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <AuthProvider>
      <Header />
      <div className="" style={{ 
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), linear-gradient(rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.1)), url(${backgroundImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '100vh' 

}}>
          <Outlet />
      </div>
      <Footer/>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
