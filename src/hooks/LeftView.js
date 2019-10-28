import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Context from '../utils/context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';

import AddForm from './addForm';
import RemoveDialog from './removeDialog';


const useToolbarStyles = makeStyles(theme => ({
  title: {
    flex: '1 1 100%',
  },
}));

function LeftView(props) {
    const classes = useToolbarStyles();
    const context = useContext(Context);
    const [open, setOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState({name: "", url: "", description: ""});
    const [updateValue, setUpdateValue] = React.useState(0);
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

    const handleOpenSetting = () => {
        setSettingsOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSettingsOpen(false);
    };

    const handleInputDesc = (event) => {
        setInputValue({name: inputValue.name, url: inputValue.url, description: event.target.value});
        console.log(inputValue);
    }

    const handleInputName = (event) => {
        setInputValue({name: event.target.value, url: inputValue.url, description: inputValue.description});
        console.log(inputValue);
    }

    const handleInputUrl = (event) => {
        setInputValue({name: inputValue.name, url: event.target.value, description: inputValue.description});
        console.log(inputValue);
    }


    const handleCameraSubmit = () => {
        console.log("Submitted camera object: ", inputValue);
        axios.post(`http://localhost:5000/camera`, {name: inputValue.name, camera_url: inputValue.url, description: inputValue.description}).then((res) => {
            console.log(res.data);
            setUpdateValue(updateValue+1);
        });
        handleClose();
    }

    const finalDelete = (deleteList) => {
        console.log("DeleteList: ", deleteList);
        axios.post(`http://localhost:5000/camera/remove`, {deleteList}).then((res) => {
            console.log(res.data);
            setUpdateValue(updateValue+1);
        });
        handleClose();
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/camera`).then((res) => {
            console.log(res.data);
            context.fetchCameras(res.data);
            context.setCurrentCamera(res.data[0]);
        })
    }, [updateValue]);

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

                        { false ? <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                                </TableCell>
                            <TableCell>Receiptant id</TableCell>
                            <TableCell align="right">Phone number</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody> 
                            {returnListItems()}
                        </TableBody> </Table> 
                        : returnListItems()
                        }

                    </List>
                </div>
                <div className="align">
                    <ButtonGroup
                        variant="contained"
                        size="large"
                        aria-label="large contained secondary button group"
                    >
                        <Button onClick={handleClickOpen}>Add camera</Button>
                        <Button onClick={handleOpenSetting}> Settings</Button>
                    </ButtonGroup>
                </div>
                <AddForm open={open} type={"Camera"} handleClose={handleClose} handleSubmit={handleCameraSubmit} field1={{name: "Name", handleInput: handleInputName}} field2={{name: "URL", handleInput: handleInputUrl}} field3={{name: "Description", handleInput: handleInputDesc}} />
                <RemoveDialog open={settingsOpen} handleSubmit={finalDelete} handleClose={handleClose} dialogTitle={"Remove camera objects"} dialogContent={"Select which camera object you want to remove."}/>
            </div>
        );
}

export default LeftView;