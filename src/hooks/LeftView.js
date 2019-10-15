import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function LeftView(props) {
        // Can't get hotkeys to work.
        // They only work after button is pressed

/*         const [cameraState, setCameras] = useState([]);

        const dispatch = useDispatch() ; */

/*         useEffect(() => {
            setCameras(props.cameraList)
        }); */

/*         const returnListItems = function returnListItems() {
            let listItems = []
            for(let i = 0; i < cameraState.length; i++) {
                    listItems.push(
                    <ListItem button key={cameraState[i].id} onClick={() => dispatch({type: "INCREMENT", payload: cameraState[i]})}>
                        <ListItemText
                            primary={cameraState[i].name}
                            secondary={cameraState[i].description}
                        />
                    </ListItem>);
            }
            return listItems;
        } */

        return(
            <div className="view">
                <div className="borderStyle align rightBorder">
                    <h3>Camera picker</h3>
                    <List >
{/*                         {returnListItems()} */}

                        <ListItem button key={1} onClick={() => console.log("clicked")}>
                            <ListItemText
                                primary={"Main text"}
                                secondary={"Second text"}
                            />
                        </ListItem>
                    </List>
                </div>
                <div className="align">
                    <ButtonGroup
                        variant="text"
                        size="large"
                        aria-label="large contained secondary button group"
                    >
                        <Button>Add camera</Button>
                        <Button>Settings</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
}

export default LeftView;