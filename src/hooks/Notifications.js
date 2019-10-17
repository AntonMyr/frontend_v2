import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Context from '../utils/context';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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
  title: {
    flex: '1 1 100%',
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

const useToolbarStyles = makeStyles(theme => ({
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  console.log(props);

  return (
    <Toolbar
      //className={clsx(classes.root, {
      //  [classes.highlight]: numSelected > 0,
     // })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Notification numbers list
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={props.handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

function Notifications(props) {
    const context = useContext(Context);
    axios.defaults.headers.common['Authorization'] = `Bearer ${context.authObj.getAccessToken()}`;

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(0);
    const [updateValue, setUpdateValue] = React.useState(0);
    const [selected, setSelected] = React.useState([]);

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

    const handleDelete = () => {
        console.log("handleDelete");
        axios.post(`http://localhost:5000/notifications/remove`, {deleteList: selected}).then((res) => {
            context.setPhoneNumbers([]);
            console.log("update value: ", updateValue);
            setUpdateValue(updateValue+1);
            console.log(updateValue)
            setSelected([]);
        });
    }


    const handleSendEvent = () => {
        axios.post(`http://localhost:5000/notifications/event`).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        console.log("This is being run", updateValue);
        console.log("AccessToken: ", context.authObj.getAccessToken());
        axios.get(`http://localhost:5000/notifications`, {},{headers: {authorization: `Bearer ${context.authObj.getAccessToken()}`}}).then((res) => {

        console.log(res.data);
        context.setPhoneNumbers(res.data);
        })
    }, [updateValue])

    const classes = useStyles();

    const handleSelectAllClick = event => {
        if (event.target.checked) {
        const newSelecteds = context.phone_numbers.map(n => n.receiptant_id);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    return (
        <div className="align">
            <Paper className={classes.root}>
{/*             <EnhancedTableToolbar numSelected={selected.length} selected={selected} handleDelete={handleDelete}/> */}

            <Toolbar
            //className={clsx(classes.root, {
            //  [classes.highlight]: numSelected > 0,
            // })}
            >
            {selected.length > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                {selected.length} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                Notification numbers list
                </Typography>
            )}

            {selected.length > 0 ? (
                <Tooltip title="Delete">
                <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                </Tooltip>
            ) : null}
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                        indeterminate={selected.length > 0 && selected.length < context.phone_numbers.length}
                        checked={selected.length === context.phone_numbers.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                    </TableCell>
{/*                     <TableCell padding="checkbox">
                    <Checkbox
//                        indeterminate={numSelected > 0 && numSelected < rowCount}
 //                       checked={numSelected === rowCount}
  //                      onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                    </TableCell> */}
                    <TableCell>Receiptant id</TableCell>
                    <TableCell align="right">Phone number</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {context.phone_numbers.map(row => {

                    const isItemSelected = isSelected(row.receiptant_id);
                    return(
                        <TableRow role="checkbox" 
                        key={row.receiptant_id} 
                        onClick={event => handleClick(event, row.receiptant_id)}
                        selected={isItemSelected}
                        >

                        <TableCell padding="checkbox">
                        <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': row.receiptant_id }}
                        />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.receiptant_id}
                        </TableCell>
                        <TableCell align="right">{row.phone_number}</TableCell>
                        </TableRow>
                    )
                }
                )}
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
                <Button onClick={handleSendEvent}>Send fake event notification</Button>
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