import React, { useState } from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { Avatar, CssBaseline, Link, Grid, Box, Typography, Container, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import { LockOutlined } from '@material-ui/icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Richard Trevorrow</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  wrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [toggleSign, setToggleSign] = useState<boolean>(false);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>

        {/* RENDER SIGN IN / UP */}
        {toggleSign ? <SignUp /> : <SignIn />}

        <Grid container>
          <Grid item xs>
            <Link variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link style={{ cursor: 'pointer' }} onClick={() => setToggleSign(!toggleSign)} variant="body2">
              {toggleSign ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
