import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/login/LoginForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthService from './services/AuthService';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

export default function App() {

  const authData = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    AuthService.checkLoggedIn(dispatch)
  }, [dispatch])

  const handleLogout = () => {
    AuthService.logOut(dispatch)
  }

  const logoutButton = (authData.accessToken === '') ? '' :
    <Button color="secondary"
      className={classes.logout}
      variant="contained" onClick={handleLogout}>Logout</Button>

  const ApplicationPage = (authData.accessToken === '') ? <LoginForm /> : <Dashboard />
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Grid container alignItems="flex-start">
            <Grid item xs={10}>
              <Typography variant="h6">API Gateway Admin</Typography>
            </Grid>
            <Grid item xs={2}>
              {logoutButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {ApplicationPage}

    </div>
  );
}
