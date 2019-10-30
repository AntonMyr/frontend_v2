import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddForm(props) {

    const returnTextFields = function returnTextFields() {
        let textFields = []
        for(let i = 0; i < props.textFields.length; i++) {
            if(i == 0) {
                textFields.push(
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="phone_number"
                    label={props.textFields[i].name}
                    type="text"
                    onChange={props.textFields[i].handleInput}
                    fullWidth
                />
                )
            } else {
                textFields.push(
                    <TextField
                    required
                    margin="dense"
                    id="phone_number"
                    label={props.textFields[i].name}
                    type="text"
                    onChange={props.textFields[i].handleInput}
                    fullWidth
                />);
            }
                
        }
        return textFields;
    }

    return(
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a {props.type} object</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Fill the form below to add a new {props.type} object
            </DialogContentText>
            {returnTextFields()}
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={props.handleSubmit} color="primary">
                Add
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddForm