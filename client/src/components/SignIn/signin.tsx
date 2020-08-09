import React, { useState } from 'react';
import { Routine } from 'redux-saga-routines';
import { GeneralState } from '../../store/user/models';
import { Button, TextField, FormControlLabel, Checkbox, Typography, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from '../../util/styles';

interface Props {
  signIn: Routine;
  userState: GeneralState | undefined;
}

export const SignIn: React.FC<Props> = ({ signIn, userState }) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const buttonClassname = clsx({
    [classes.buttonSuccess]: userState?.data ? true : false,
    [classes.buttonFailure]: userState?.error ? true : false,
  });

  const onSubmit = () => {
    email.length > 0 && password.length > 0 && signIn({ email, password });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={buttonClassname}
            disabled={userState?.pending}
            onClick={onSubmit}
          >
            Sign in
          </Button>
          {userState?.pending && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </>
  );
};
