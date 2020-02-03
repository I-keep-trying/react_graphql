import { gql } from 'apollo-boost';

export const getAllArticles = gql`
{
     products (first: 10) {
    edges {
      node {
        id
        title
        description
        images (first: 3) {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
        variants (first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  } 
  }
  `