import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  # First we declare which mutation we are sending and what types of variable are we sending
  mutation login($email: String!, $password: String!) {
    # Second we assign the variables to the data that is being sent
    login(email: $email, password: $password) {
      # Third we specify what data we want to get back from the request
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  # First we declare which mutation we are sending and what types of variable are we sending
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    # Second we specify what data is sent and assigning the data into the registerInput type
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      # Third we specify what data we want to get back from the request
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
