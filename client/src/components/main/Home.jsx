import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Transition, Container} from "semantic-ui-react";

import PostCard from "../posts/PostCard";
import {AuthContext} from "../../context/authContext"
import PostForm from "../posts/PostForm";
import {FETCH_POSTS_QUERY}  from "../../util/gql/gqlQueries";
import Spinner from '../../util/Spinner';


const Home = () => {
    const { loading, data:{getPosts:posts}={}} = useQuery(FETCH_POSTS_QUERY);

    const {user} = useContext(AuthContext)

    return ( 
      <Container>
    <Grid columns={3}>
      <Grid.Row className="pageTitle">
        <h1>TREND</h1>
      </Grid.Row>
      <Grid.Row>
      {user ? 
        <Grid.Column>
          <h3>Share your thought?</h3>
          <PostForm/>
        </Grid.Column>
      : null}
      </Grid.Row>
        {loading ? (
          <Grid.Row style={{marginTop:80}}>
            <Spinner size="huge"/>
          </Grid.Row>
        ) :  (<Grid.Row>
        <Transition.Group>
          {posts.map(post =>(
          <Grid.Column key={post.id} style={{marginBottom:20}}>
            <PostCard post={post}/>
          </Grid.Column>))}
        </Transition.Group>
      </Grid.Row>
        )}
    </Grid>
      </Container>
     );
}



export default Home;