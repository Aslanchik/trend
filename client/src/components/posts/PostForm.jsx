import React from 'react';
import {Form} from "semantic-ui-react";
import {useMutation} from "@apollo/client";

import {useForm} from '../../util/customHooks';
import {FETCH_POSTS_QUERY} from "../../util/gql/gqlQueries"
import {CREATE_POST_MUTATION} from "../../util/gql/gqlMutations";
import SubmitBtn from '../../util/SubmitBtn';

const PostForm = () => {
    const {values, onChange, onSubmit} = useForm(handleCreatePost, {body:''});

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables:values,
        update(proxy, res){
            // Get data from cache to manually override it without making a new request to fetch data
            const data = proxy.readQuery({
                query:FETCH_POSTS_QUERY
            })
            // Push new post unto the head of the posts array in the cache
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
        <Form onSubmit={onSubmit} className="postForm">
            <h2>Share a thought</h2>
            <Form.Field>
                <div className="ui action right labeled input">
                    <input placeholder="Hi world!" name="body" type="textarea" onChance={onChange} error={error} value={values.body}/>
        <SubmitBtn btnClass="postBtn"/>
                </div>
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