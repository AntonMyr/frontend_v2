import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddForm(props) {

    return(
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a {props.type} object</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Fill the form below to add a new {props.type} object
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="phone_number"
                label={props.field1.name}
                type="text"
                onChange={props.field1.handleInput}
                fullWidth
            />
            <TextField
                required
                margin="dense"
                id="phone_number"
                label={props.field2.name}
                type="text"
                onChange={props.field2.handleInput}
                fullWidth
            />
            <TextField
                required
                margin="dense"
                id="phone_number"
                label={props.field3.name}
                type="text"
                onChange={props.field3.handleInput}
                fullWidth
            />
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