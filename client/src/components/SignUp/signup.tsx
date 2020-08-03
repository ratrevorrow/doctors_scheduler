import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import * as actions from '../../store/actions';
import { GenericResponse } from '../../store/models';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';

import { LockOutlined } from '@material-ui/icons';

interface Props {
  signUp: Routine;
  data: GenericResponse;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Richard</Link> {new Date().getFullYear()}
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC<Props> = ({ signUp, data }) => {
  const classes = useStyles();

  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);

  const onSubmit = () => {
    setSubmitting(true);
    const obj = {
      firstname: 'bob',
      lastname: 'vance',
      email: 's@s.com',
      password: 'asdasdasd',
    };
    signUp(obj);
    // signUp({ firstname, lastname, email, password });
  };

  const validateEmail = (emailInput: string) => {
    setEmail(emailInput);
    if (emailInput.length > 0) {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      setIsInvalidEmail(!mailformat.test(emailInput));
    } else {
      setIsInvalidEmail(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                error={firstname.length === 0 && submitting}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
                error={lastname.length === 0 && submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                placeholder="abcdef@xyz.com"
                onChange={(e) => validateEmail(e.target.value)}
                error={(email.length === 0 || isInvalidEmail) && submitting}
                helperText={isInvalidEmail && 'Match abcdef@xyz.com'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                error={password.length === 0 && submitting}
              />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={onSubmit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: GenericResponse) => ({ data: { ...state } });

const mapDispatchToProps = {
  signUp: actions.login.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
