import React from 'react';
import {Form, Button} from "semantic-ui-react";
import {useMutation} from "@apollo/client";

import {useForm} from '../../util/customHooks';
import {FETCH_POSTS_QUERY} from "../../util/gql/gqlQueries"
import {CREATE_POST_MUTATION} from "../../util/gql/gqlMutations";

const PostForm = () => {
    const {values, onChange, onSubmit} = useForm(handleCreatePost, {body:''});

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables:values,
        update(proxy, res){
            // Get data from cache to manually override it without making a new request to fetch data
            const data = proxy.readQuery({
                query:FETCH_POSTS_QUERY
            })
            // Push
            proxy.writeQuery({query:FETCH_POSTS_QUERY, data:{
                getPosts:[res.data.createPost, ...data.getPosts]
            }})
            // Reset input field
            values.body ='';
        },
        onError(err){
            return err;
        }
    })

    function handleCreatePost(){
        createPost();
    }

    return ( 
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
        <Form.Input placeholder="Hi world!" name="body" type="textarea" onChange={onChange} error={error ? true: false} value={values.body}/>
        <Button type="submit" color="pink">Post!</Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom:20, fontSize:'1rem'}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
     );
}



export default PostForm;