import React, { useContext } from 'react';
import {Link} from "react-router-dom";
import {Card, Icon, Label, Image, Button} from "semantic-ui-react"
import moment from 'moment';

import { AuthContext } from '../../context/authContext';
import LikeBtn from "./LikeBtn"
import DeleteBtn from './DeleteBtn';

const PostCard = ({post:{id,username,createdAt,body, likeCount, commentCount, likes}}) => {
  const {user} = useContext(AuthContext);

    return ( 
         <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://pbs.twimg.com/profile_images/568315995207372800/mExnhAK5_400x400.jpeg'
        />
        <Card.Header>{username}</Card.Header>
    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeBtn user={user} post={{id, likes, likeCount}}/>
        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button color='blue'basic>
        <Icon name='comment' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    {user && user.username === username && (
      <DeleteBtn postId={id}/>
    )}
      </Card.Content>
    </Card>
    )
}
 
export default PostCard;