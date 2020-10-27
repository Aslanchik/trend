import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {Button, Icon, Confirm} from "semantic-ui-react";
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from '../../util/gql/gqlMutations';

import {FETCH_POSTS_QUERY} from "../../util/gql/gqlQueries";

const DeleteBtn = ({postId,commentId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    // Determine if this button deletes a post or a comment depending on whether commentId exists
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        variables:{postId, commentId},
        update(proxy){
            // Close confirm modal when post is deleted
            setConfirmOpen(false);
            // If there is no commentId its a post deletion and not a comment deletion so change cache
            if(!commentId){
                // Get data from cache to manually override it without making a new request to fetch data
                const data = proxy.readQuery({
                    query:FETCH_POSTS_QUERY
                });
                // Filter cached posts to remove the deleted post
                proxy.writeQuery({query:FETCH_POSTS_QUERY, data:{
                    getPosts:[...data.getPosts.filter(p=>p.id !==postId)]
                }});
            }
            
            if(callback) callback();
        }
    })

    return ( 
        <>
        <Button as="div" color="red" onClick={()=> setConfirmOpen(true)} floated="right">
        <Icon name="trash alternate outline" style={{margin:0}}/>
    </Button>
    <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrComment}/>
    </>
     );
}
 
export default DeleteBtn;