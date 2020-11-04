import React, { useContext, useRef } from 'react';
import {useQuery, useMutation} from "@apollo/client";
import { FETCH_SINGLE_POST_QUERY } from '../../util/gql/gqlQueries';
import {Image, Grid, Card, Form, Comment, Header} from "semantic-ui-react";
import moment from "moment";

import LikeBtn from './LikeBtn';
import DeleteBtn from "./DeleteBtn";
import { AuthContext } from '../../context/authContext';
import Spinner from "../../util/Spinner";
import { CREATE_COMMENT_MUTATION } from '../../util/gql/gqlMutations';
import {useForm} from "../../util/customHooks";
import SubmitBtn from '../../util/SubmitBtn';

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
                likeCount
            } = {}
        } = {}
    } = useQuery(FETCH_SINGLE_POST_QUERY, {
        variables:{postId},
    });
    
    console.log(comments);
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
      ( <Grid >
        <Grid.Row centered>
            <Grid.Column width={1}>
            <Image floated='left'
          size='small'
          src='/img/female_avatar.svg'/>
            </Grid.Column>
        
            <Grid.Column width={10} >
                <Card fluid centered>
                    <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
    <Card.Description>{body}</Card.Description>
                    </Card.Content>
                    <hr></hr>
                    <Card.Content extra>
                        <LikeBtn user={user} post={{id, likes, likeCount}}/>
                        {user && user.username === username && <DeleteBtn postId={id} callback={deletePostRedirect}/>}
                    </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                            <p>Post a comment:</p>
                            <Form onSubmit={onSubmit}>
                                <Form.Field>
                                <div className="ui action right labeled input">
                                    <input type="textarea" placeholder="Comment.." name="body" value={values.body} onChange={onChange} ref={commentInputRef}/>
                                    <SubmitBtn btnClass="submitCommentBtn" disabled={values.body.trim() === ''}/>
                                </div>
                                </Form.Field>
                            </Form>
                            </Card.Content>
                        </Card>
                    )}
                    <Grid.Row centered>
                        <Grid.Column width={16}>
                    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
                    {comments.map(comment => (
                        <Comment>
      <Comment.Avatar src='/img/female_avatar.svg' />
      <Comment.Content>
        <Comment.Author as="span">{comment.username}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(comment.createdAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>))}
    </Comment.Group>
                        </Grid.Column>
                    </Grid.Row>
            </Grid.Column>
        </Grid.Row>
    </Grid>)}
    
 
export default PostPage;