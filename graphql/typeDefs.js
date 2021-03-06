const { gql } = require("apollo-server");

module.exports = gql`
  # Type definition for a Comment
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  # Type definition for a Like
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  # Type definition for a Post
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  # Type definition for a User
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  # Type definition for a Register Input
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  # Queries get data
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  # Mutations change the data (add, delete, update etc)
  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  # Subscriptions let you listen to changes in data
  type Subscription {
    newPost: Post!
  }
`;
