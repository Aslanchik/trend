import React, { useContext, useRef } from 'react';
import {useQuery, useMutation} from "@apollo/client";
import { FETCH_SINGLE_POST_QUERY } from '../../util/gql/gqlQueries';
import {Image, Grid, Card, Button, Icon, Label, Form} from "semantic-ui-react";
import moment from "moment";

import LikeBtn from './LikeBtn';
import DeleteBtn from "./DeleteBtn";
import { AuthContext } from '../../context/authContext';
import Spinner from "../../util/Spinner";
import { CREATE_COMMENT_MUTATION } from '../../util/gql/gqlMutations';
import {useForm} from "../../util/customHooks";

const PostPage = (props) => {
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const {values, onChange, onSubmit} = useForm(handleCreateComment, {postId, body:''})

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

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables:values,
        update(){
            values.body='';
            commentInputRef.current.blur();
        }
    })

    function handleCreateComment(){
        createComment();
    }

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
            <Image floated='left'
          size='small'
          src='https://pbs.twimg.com/profile_images/568315995207372800/mExnhAK5_400x400.jpeg'/>
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
                    {user && (
                        <Card fluid>


                            <Card.Content>
                            <p>Post a comment:</p>
                            <Form onSubmit={onSubmit}>
                                <div className="ui action input fluid">
                                    <input type="textarea" placeholder="Comment.." name="body" value={values.body} onChange={onChange} ref={commentInputRef}/>
                                    <button type="submit" className="ui button pink" disabled={values.body.trim() === ''} >Submit comment</button>
                                </div>
                            </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments.map(comment => (
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && <DeleteBtn postId={id} commentId={comment.id}/>}
                                <Card.Header>
                                    {comment.username}
                                </Card.Header>
                                <Card.Meta>
                                    {moment(comment.createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {comment.body}
                                </Card.Description>
                            </Card.Content>
                        </Card>))}
            </Grid.Column>
        </Grid.Row>
    </Grid>)}
    
 
export default PostPage;