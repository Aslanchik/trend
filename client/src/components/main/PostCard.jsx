import React from 'react';
import {Link} from "react-router-dom";
import {Card, Icon, Label, Image, Button} from "semantic-ui-react"
import moment from 'moment';

const PostCard = ({post:{id,username,createdAt,body, likeCount, commentCount, likes}}) => {

  const likePost = () =>{
    
  }
  const commentOnPost = () =>{
    
  }

    return ( 
         <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='pink'basic>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic color='pink' pointing='left'>
        {likeCount}
      </Label>
    </Button>
        <Button as='div' labelPosition='right' onClick={commentOnPost}>
      <Button color='blue'basic>
        <Icon name='comment' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
    )
}
 
export default PostCard;