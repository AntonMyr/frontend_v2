import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Context from '../utils/context';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    width: '50%',
    overflowX: 'auto',
    marginTop: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Notifications(props) {
    const context = useContext(Context);

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(0);
    const [updateValue, setUpdateValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    }

    const handleNumberSubmit = () => {
        console.log("Submitted number: ", inputValue);
        axios.post(`http://localhost:5000/notifications`, {phone_number: inputValue}).then((res) => {
            console.log(res.data);
            setUpdateValue(updateValue+1);
        });
        setOpen(false);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/notifications`).then((res) => {
        console.log(res.data);
        context.setPhoneNumbers(res.data);
        })
    }, [updateValue])

    const classes = useStyles();

    return (
        <div className="align">
            <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                    <Checkbox
//                        indeterminate={numSelected > 0 && numSelected < rowCount}
 //                       checked={numSelected === rowCount}
  //                      onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                    </TableCell>
                    <TableCell>Receiptant id</TableCell>
                    <TableCell align="right">Phone number</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {context.phone_numbers.map(row => (
                    <TableRow role="checkbox" key={row.receiptant_id}>

                    <TableCell padding="checkbox">
                    <Checkbox
                    //checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': row.receiptant_id }}
                    />
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.receiptant_id}
                    </TableCell>
                    <TableCell align="right">{row.phone_number}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Paper>
            <ButtonGroup
                variant="contained"
                size="large"
                aria-label="large contained secondary button group"
                className="view"
            >
                <Button onClick={handleClickOpen}>Add phone number</Button>
                <Button>Send fake event notification</Button>
            </ButtonGroup>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add phone number</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter the phone number you want to add below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="phone_number"
                    label="Number"
                    type="phone"
                    onChange={handleInput}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleNumberSubmit} color="primary">
                    Add
                </Button>
                </DialogActions>
        </Dialog>
        </div>
    );
}

export default Notifications;