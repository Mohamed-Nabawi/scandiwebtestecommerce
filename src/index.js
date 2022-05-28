import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider} from '@apollo/client'
  import { Provider } from "react-redux";
  import {store}from './Redux/store'
  import { BrowserRouter } from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const root=ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
  <App />,
    </BrowserRouter>
  </Provider>
</ApolloProvider>
</React.StrictMode>
)