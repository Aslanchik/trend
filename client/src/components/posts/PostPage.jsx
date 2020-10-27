import React, { useContext } from 'react';
import {useQuery} from "@apollo/client";
import { FETCH_SINGLE_POST_QUERY } from '../../util/gql/gqlQueries';
import {Image, Grid, Card, Button, Icon, Label} from "semantic-ui-react";
import moment from "moment";

import LikeBtn from './LikeBtn';
import DeleteBtn from "./DeleteBtn";
import { AuthContext } from '../../context/authContext';
import Spinner from "../../util/Spinner";

const PostPage = (props) => {

    const {user} = useContext(AuthContext);
    const postId = props.match.params.postId;
    const {loading,
        data:{
            getPost:{
                id,
                body, 
                createdAt, 
                username, 
                comments, 
                likes, 
                likeCount, 
                commentCount
                } = {}
        } = {}
         } = useQuery(FETCH_SINGLE_POST_QUERY, {
        variables:{postId},
    });

    const deletePostRedirect = () =>{
        props.history.push("/")
    };

    return loading ? (
        <Spinner size="huge"/>
    )
      : 
      ( <Grid>
        <Grid.Row>
            <Grid.Column width={2}>

            <Image floated='right'
          size='small'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
            </Grid.Column>
        
            <Grid.Column width={10}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
    <Card.Description>{body}</Card.Description>
                    </Card.Content>
                    <hr></hr>
                    <Card.Content extra>
                        <LikeBtn user={user} post={{id, likes, likeCount}}/>
                        <Button as="div" labelPosition="right" onClick={()=> console.log("comment")}>
                            <Button basic color="blue">
                                <Icon name="comment"/>
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                        {user && user.username === username && <DeleteBtn postId={id} callback={deletePostRedirect}/>}
                    </Card.Content>
                    </Card>
            </Grid.Column>
        </Grid.Row>
    </Grid>)}
    
 
export default PostPage;