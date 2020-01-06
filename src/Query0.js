import { gql } from 'apollo-boost';

export const getAllArticles = gql`{
  articles {
    title
    description
    coverImageUrl
    author {
      name
      country
    }
  }
}`