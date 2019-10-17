import React, { useContext } from 'react';
import Context from '../utils/context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function RightView(props) {

    const context = useContext(Context);
    const returnListItems = function returnListItems() {
        let listItems = []
        for(let i = 0; i < context.vehicleList.length; i++) {
                listItems.push(
                <ListItem button key={context.vehicleList[i].vehicle_id} onClick={() => context.setCurrentVehicle(context.vehicleList[i])}>
                    <ListItemText
                        primary={context.vehicleList[i].name}
                        secondary={context.vehicleList[i].description}
                    />
                </ListItem>);
        }
        return listItems;
    }

    return(
        <div className="view">
            <div className="borderStyle align">
            <h3>Vehicle picker</h3>
            <List >
                {returnListItems()}
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