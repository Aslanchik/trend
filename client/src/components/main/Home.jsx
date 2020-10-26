import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Grid} from "semantic-ui-react";

import PostCard from "./PostCard";

const FETCH_POSTS_QUERY = gql`
query{
  getPosts{
    id
    username
    body
    createdAt
    likeCount
    likes{
      username
    }
    comments{
      id
      username
      body
      createdAt
    }
    commentCount
  }
}`

const Home = () => {
    const { loading, data:{getPosts:posts}={}} = useQuery(FETCH_POSTS_QUERY);

    return ( 
    <Grid columns={3}>
      <Grid.Row className="pageTitle">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) :  (posts.map(post =>(
          <Grid.Column key={post.id} style={{marginBottom:20}}>
            <PostCard post={post}/>
          </Grid.Column>
        )))}
      </Grid.Row>
    </Grid>
     );
}



export default Home;