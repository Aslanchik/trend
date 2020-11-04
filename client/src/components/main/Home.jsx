import React, {useContext} from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Container} from "semantic-ui-react";

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
    <Grid doubling stackable columns={3}>
      <Grid.Row centered>
      {user ? 
      <>
      <Grid.Column data-aos="fade-in">
        <img src="/img/add_post.svg" alt="add post" className="addPostImg"/>
      </Grid.Column>
        <Grid.Column width={10} data-aos="fade-in">
          <PostForm/>
        </Grid.Column>
        </>
      : null}
      </Grid.Row>
        {loading ? (
          <Grid.Row style={{marginTop:80}}>
            <Spinner size="huge"/>
          </Grid.Row>
        ) :  (<Grid.Row style={{marginTop:30}}>
          {posts.map(post =>(
          <Grid.Column key={post.id} style={{marginBottom:20}} data-aos="fade-right">
            <PostCard post={post}/>
          </Grid.Column>))}
      </Grid.Row>
        )}
    </Grid>
      </Container>
     );
}



export default Home;