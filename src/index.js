import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';
import 'dotenv/config';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `bearer ${
          process.env.REACT_APP_GITHUB_ACCESS_TOKEN
        }`
      }
    });
  }
});

const GET_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
      repositories(first: 5) {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  }
`;

client
  .query({
    query: GET_ORGANIZATION,
    variables: {
      organization: 'the-road-to-learn-react'
    }
  })
  .then(response => console.log(response));
