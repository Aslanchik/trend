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

export const FETCH_MY_POSTS_QUERY = gql`
  query($userId: ID!) {
    getMyPosts(userId: $userId) {
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

export const FETCH_SINGLE_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
