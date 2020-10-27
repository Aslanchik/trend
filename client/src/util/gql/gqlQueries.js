import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;
