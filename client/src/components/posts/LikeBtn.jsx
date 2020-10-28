import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Button, Icon, Label} from "semantic-ui-react";

import {LIKE_POST_MUTATION} from "../../util/gql/gqlMutations";

const LikeBtn = ({user, post:{id, likes, likeCount}}) => {
    const [liked, setLiked] = useState(false);
    useEffect(()=>{
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true);
        }else setLiked(false);
    }, [user,likes])

    const [likePost, {error}] = useMutation(LIKE_POST_MUTATION, {
        variables:{postId: id},
        onError(err){
            return error;
        }
    } )

    const renderLikeButton = () =>{
        if(user){
            if(liked){
                return <Button color='pink' className="likeBtnFilled">
        <Icon name='heart' />
      </Button>;
            } else {
                return <Button color='pink' className="likeBtnEmpty" animated basic>
                  <Button.Content hidden>Like</Button.Content>
                  <Button.Content visible>
                      <Icon name='heart' />
                  </Button.Content>
      </Button>
            }
        } else return <Button as={Link} to="/login" color='pink' basic>
        <Icon name='heart' />
      </Button>
    }

    return ( 
        <Button as='div' labelPosition='right' onClick={likePost}>
      {renderLikeButton()}
      <Label as='a' basic color='pink' pointing='left'>
        {likeCount}
      </Label>
    </Button>
     );
}
 
export default LikeBtn;