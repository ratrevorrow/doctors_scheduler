import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import * as actions from '../../store/actions';
import { SignUpState } from '../../store/signup/models';
import clsx from 'clsx';
import { Button, TextField, Grid, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

interface Props {
  signUp: Routine;
  signUpState: SignUpState;
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

const SignUp: React.FC<Props> = ({ signUp, signUpState }) => {
  const classes = useStyles();
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: signUpState.data ? true : false,
    [classes.buttonFailure]: signUpState.error ? true : false,
  });

  const onSubmit = () => {
    setSubmitting(true);
    const obj = {
      first_name: 'xfbrocbx2',
      last_name: 'xvgcrancex2',
      username: 'sgrx2@scx2.com',
      password: 'aascrxgdsadasdasd',
    };
    signUp(obj);
    // signUp({ firstname, lastname, email, password });
  };

  const validateEmail = (emailInput: string) => {
    setEmail(emailInput);
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setIsInvalidEmail(emailInput.length > 0 && !mailformat.test(emailInput));
  };

  return (
    <>
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
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={buttonClassname}
            disabled={signUpState.pending}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          {signUpState.pending && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state: any) => ({ signUpState: { ...state.signup } });

const mapDispatchToProps = {
  signUp: actions.signUp.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
