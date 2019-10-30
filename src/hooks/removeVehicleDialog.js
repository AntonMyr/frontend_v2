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
  dialog: {
    width: "40vw"
  },
  root: {
    overflowX: 'auto',
    marginTop: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  dialog: {
    minWidth: "40vw !important"
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  console.log(props);

  return (
    <Toolbar>
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

function RemoveDialog(props) {
    const context = useContext(Context);
    axios.defaults.headers.common['Authorization'] = `Bearer ${context.authObj.getAccessToken()}`;

    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(0);
    const [updateValue, setUpdateValue] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [vehicleList, setVehicleList] = React.useState(context.vehicleList);
    const [deleteList, setDeleteList] = React.useState([]);

    const handleInput = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    }

    const handleDelete = () => {
      let tempDeleteList = vehicleList;
      tempDeleteList = tempDeleteList.filter(element => {
          console.log(element);
          if(!(selected.includes(element.vehicle_id))) {
            console.log("Returned:", element);
            return element;
          }
        });
        console.log("after: ", tempDeleteList);
        setDeleteList(selected);
        setVehicleList(tempDeleteList);
        setSelected([]);
    }

    const classes = useStyles();

    const handleSelectAllClick = event => {
        if (event.target.checked) {
          const newSelecteds = vehicleList.map(n => n.vehicle_id);
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

    useEffect(() => {
      setVehicleList(context.vehicleList);
    }, [props.open]);
    return (
            <Dialog fullWidth={true} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
              <DialogContent >

            <Toolbar>
            {selected.length > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                {selected.length} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                {props.dialogTitle}
                <DialogContentText>
                    {props.dialogContent}
                </DialogContentText>
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
                        indeterminate={selected.length > 0 && selected.length < vehicleList.length}
                        checked={selected.length === vehicleList.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                    </TableCell>
                    <TableCell>Vehicle id</TableCell>
                    <TableCell align="right">Vehicle name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {vehicleList.map(row => {

                    const isItemSelected = isSelected(row.vehicle_id);
                    return(
                        <TableRow role="checkbox" 
                        key={row.vehicle_id} 
                        onClick={event => handleClick(event, row.vehicle_id)}
                        selected={isItemSelected}
                        >

                        <TableCell padding="checkbox">
                        <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': row.vehicle_id }}
                        />
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.vehicle_id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        </TableRow>
                    )
                }
                )}
                </TableBody>
            </Table>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => props.handleSubmit(deleteList)} color="primary">
                Confirm changes
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RemoveDialog;