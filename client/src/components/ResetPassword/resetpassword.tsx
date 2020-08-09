import React, { useState } from 'react';
import { Routine } from 'redux-saga-routines';
import { GeneralState } from '../../store/user/models';
import clsx from 'clsx';
import { Button, TextField, Grid, Typography, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../util/styles';
import './resetpassword.scss';

interface Props {
  signUp: Routine;
  email: string | undefined;
  signUpState: GeneralState | undefined;
}

export const ResetPassword: React.FC<Props> = ({ signUp, signUpState, email }) => {
  const classes = useStyles();
  const [password, setPassword] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: signUpState?.data ? true : false,
    [classes.buttonFailure]: signUpState?.error ? true : false,
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
            disabled={signUpState?.pending}
            onClick={onSubmit}
          >
            Reset Password
          </Button>
          {signUpState?.pending && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </div>
  );
};
