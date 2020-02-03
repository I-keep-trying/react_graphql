import React from 'react';
import ReactDOM from 'react-dom';
/* import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloProvider } from 'react-apollo';
import produce from "immer";
import App from './App';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    );
  }
});

  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: `https://dev-store9.myshopify.com/api/graphql`
  });

  const authLink = setContext((_, oldContext) => {
    return produce(oldContext, draft => {
      if (!draft.headers) {
        draft.headers = {};
      }
      draft.headers[
        "X-Shopify-Storefront-Access-Token"
      ] = `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`;
    });
  });

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, authLink, httpLink])
  });



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

