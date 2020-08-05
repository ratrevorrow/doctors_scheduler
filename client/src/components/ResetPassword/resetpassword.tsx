import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import * as actions from '../../store/actions';
import { SignUpState } from '../../store/signup/models';
import { signIn } from '../../store/selectors';
import { signUp } from '../../store/selectors';
import { RootState } from '../../store/models';
import clsx from 'clsx';
import { Button, TextField, Grid, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import './resetpassword.scss';

interface Props {
  signUp: Routine;
  email: string | undefined;
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

const ResetPassword: React.FC<Props> = ({ signUp, signUpState, email }) => {
  const classes = useStyles();
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: signUpState.data ? true : false,
    [classes.buttonFailure]: signUpState.error ? true : false,
  });

  const onSubmit = () => {
    setSubmitting(true);
    signUp({ email, password });
  };

  return (
    <div className="slide-in">
      <Typography component="h1" variant="h5">
        You are now in the system, please reset your password to continue...
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={email}
              id="email"
              label="Email Address"
              name="email"
              disabled={true}
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
            Reset Password
          </Button>
          {signUpState.pending && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: signIn.getEmail(state),
  signUpState: signUp.getSignUpState(state),
});

const mapDispatchToProps = {
  signUp: actions.signUp.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
