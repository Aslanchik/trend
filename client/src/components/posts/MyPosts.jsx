import React, { useContext } from 'react';
import {useQuery} from "@apollo/client";
import {Grid, Container} from "semantic-ui-react";

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
    return ( <Container>
    <Grid doubling stackable columns={3}>
        {loading ? (
          <Grid.Row style={{marginTop:80}}>
            <Spinner size="huge"/>
          </Grid.Row>
        ) :  (<Grid.Row style={{marginTop:30}}>
          {posts.map(post =>(
          <Grid.Column  key={post.id} style={{marginBottom:20}} data-aos="fade-right">
            <PostCard post={post}/>
          </Grid.Column>))}
      </Grid.Row>
        )}
    </Grid>
      </Container> );
}
 
export default MyPosts;