import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Context from '../utils/context';

/* const Header = () => {
  const context = useContext(Context)

    return(
        <div>
          <Link to='/' style={{padding: '5px'}}>
            Home
          </Link>
          <Link to='/profile' style={{padding: '5px'}}>
            Profile
          </Link>
          <Link to='/hooksform' style={{padding: '5px'}}>
            Hooks Form
          </Link>
          <Link to='/hookscontainer' style={{padding: '5px'}}>
            Hooks Container
          </Link>
          <Link to='/privateroute' style={{padding: '5px'}}>
            Private Route
          </Link>
          {!context.authState
            ? <button onClick={() => context.authObj.login()}>Login</button>
            : <button onClick={() => context.authObj.logout()}>Logout</button>
          }
        </div>
  )}; */

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: '10px'
  },
});

function Header() {
  const classes = useStyles();
  const context = useContext(Context);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Typography className="title" variant="h5">
        Godseye
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Main view" component={Link} to="/"/>
        <Tab label="Notification settings" component={Link} to="/notifications" />
        {/* <Tab label="Logout" onClick={() => axios.get(`https://godseye.eu.auth0.com/v2/logout`)} component={Link} to="/"/> */}
      </Tabs>
    </Paper>
  );
}
export default Header;