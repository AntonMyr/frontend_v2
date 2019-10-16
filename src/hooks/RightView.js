import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function RightView(props) {

    return(
        <div className="view">
            <div className="borderStyle align">
            <h3>Vehicle picker</h3>
            <List> 
                <ListItem button key={1} >
                    <ListItemText
                        primary="Test"
                        secondary="Test2"
                    />
                </ListItem>
            </List>
            </div>
            <div className="align">
                <ButtonGroup
                    variant="contained"
                    size="large"
                    aria-label="large contained secondary button group"
                >
                    <Button>Add vehicles</Button>
                    <Button>Settings</Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default RightView;