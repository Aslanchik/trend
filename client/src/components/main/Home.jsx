import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {Grid} from "semantic-ui-react";

import PostCard from "../posts/PostCard";
import {AuthContext} from "../../context/authContext"
import PostForm from "../posts/PostForm";
import {FETCH_POSTS_QUERY}  from "../../util/gql/gqlQueries";


const Home = () => {
    const { loading, data:{getPosts:posts}={}} = useQuery(FETCH_POSTS_QUERY);

    const {user} = useContext(AuthContext)

    return ( 
    <Grid columns={3}>
      <Grid.Row className="pageTitle">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="pageTitle">
      {user ? 
        <Grid.Column>
          <PostForm/>
        </Grid.Column>
      : null}
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