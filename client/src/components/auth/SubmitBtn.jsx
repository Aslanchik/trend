import React from 'react';
import {Button, Icon} from "semantic-ui-react";

const SubmitBtn = ({content = 'Submit', icon= 'send'}) => {
    return ( 
        <Button type="submit" className="" animated>
                    <Button.Content hidden>
                    {content}
                    </Button.Content>
                    <Button.Content visible>
                        <Icon name={icon}/>
                    </Button.Content>
                </Button>
     );
}
 
export default SubmitBtn;