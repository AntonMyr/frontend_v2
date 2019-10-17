import React, { useContext } from 'react';
import Context from '../utils/context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AddForm from './addForm';

function LeftView(props) {
    const context = useContext(Context);
    const [open, setOpen] = React.useState(false);
        // Can't get hotkeys to work.
        // They only work after button is pressed

/*         const [cameraState, setCameras] = useState([]);

        const dispatch = useDispatch() ; */

/*         useEffect(() => {
            setCameras(props.cameraList)
        }); */


    const handleClickOpen = () => {
        console.log('click');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

        const returnListItems = function returnListItems() {
            let listItems = []
            for(let i = 0; i < context.cameraList.length; i++) {
                    listItems.push(
                    <ListItem button key={context.cameraList[i].camera_id} onClick={() => context.setCurrentCamera(context.cameraList[i])}>
                        <ListItemText
                            primary={context.cameraList[i].name}
                            secondary={context.cameraList[i].description}
                        />
                    </ListItem>);
            }
            return listItems;
        }

        return(
            <div className="view">
                <div className="borderStyle align rightBorder">
                    <h3>Camera picker</h3>
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
                        <Button onClick={handleClickOpen}>Add camera</Button>
                        <Button>Settings</Button>
                    </ButtonGroup>
                </div>
                <AddForm open={open} type={"Camera"} handleClose={handleClose} field1={"Name"} field2={"URL"} field3={"Description"} />
            </div>
        );
}

export default LeftView;