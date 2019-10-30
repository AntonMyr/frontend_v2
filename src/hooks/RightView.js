import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Context from '../utils/context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AddForm from './addForm';
import RemoveDialog from './removeVehicleDialog';

function RightView(props) {

    const context = useContext(Context);

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState({name: "", description: ""});
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [updateValue, setUpdateValue] = React.useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/vehicles`).then((res) => {
          console.log(res.data);
          context.fetchVehicles(res.data);
          context.setCurrentVehicle(res.data[0]);
        })
      }, [updateValue])

    const handleClose = () => {
        setOpen(false);
        setSettingsOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenSetting = () => {
        setSettingsOpen(true);
    }
    const handleVehicleSubmit = () => {
        console.log("Submitted camera object: ", inputValue);
        axios.post(`http://localhost:5000/vehicles`, {name: inputValue.name, description: inputValue.description}).then((res) => {
            console.log(res.data);
            setUpdateValue(updateValue+1);
        });
        handleClose();
    }

    const finalDelete = (deleteList) => {
        deleteList = deleteList.map(element => {
            return {vehicle_id: element}
        });
        console.log("DeleteList: ", deleteList);

        axios.post(`http://localhost:5000/vehicles/remove`, {deleteList}).then((res) => {
            console.log(res.data);
            setUpdateValue(updateValue+1);
        });
        handleClose();
    };


    const handleInputName = (event) => {
        setInputValue({name: event.target.value, url: inputValue.url, description: inputValue.description});
        console.log(inputValue);
    }

    const handleInputDesc = (event) => {
        setInputValue({name: inputValue.name, url: inputValue.url, description: event.target.value});
        console.log(inputValue);
    }


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

    const textFields = [
        {name: "Name", handleInput: handleInputName},
        {name: "Description", handleInput: handleInputDesc}
    ]

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
                    <Button onClick={handleClickOpen}>Add vehicles</Button>
                    <Button onClick={handleOpenSetting}>Settings</Button>
                </ButtonGroup>
                <AddForm 
                    open={open} 
                    type={"Vehicle"} 
                    handleClose={handleClose} 
                    handleSubmit={handleVehicleSubmit} 
                    textFields={textFields}
                />
                <RemoveDialog open={settingsOpen} handleSubmit={finalDelete} handleClose={handleClose} dialogTitle={"Remove vehicle objects"} dialogContent={"Select which vehicle object you want to remove."}/>
            </div>
        </div>
    );
}

export default RightView;