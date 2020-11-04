import React, { useContext } from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Container, Header} from "semantic-ui-react";

import { FETCH_MY_POSTS_QUERY } from '../../util/gql/gqlQueries';
import PostCard from "./PostCard";
import Spinner from "../../util/Spinner";
import { AuthContext } from '../../context/authContext';

const MyPosts = () => {
    const {user} = useContext(AuthContext);
    const {loading, data:{getMyPosts:posts}={}} = useQuery(FETCH_MY_POSTS_QUERY, {
        variables:{userId:user.id}
    });
    console.log(posts);
    return ( <Container className="myPostsContainer" data-aos="fade-in">
    <Grid doubling stackable columns={3}>
        <Grid.Row centered>
            <Header as='h1' dividing className="myPostsTitle">
      My Posts
    </Header>
        </Grid.Row>
        {loading ? (
          <Grid.Row style={{marginTop:80}}>
            <Spinner size="huge"/>
          </Grid.Row>
        ) :  (<Grid.Row>
          {posts.map(post =>(
          <Grid.Column  key={post.id} style={{marginBottom:20}}>
            <PostCard post={post}/>
          </Grid.Column>))}
      </Grid.Row>
        )}
    </Grid>
      </Container> );
}
 
export default MyPosts;