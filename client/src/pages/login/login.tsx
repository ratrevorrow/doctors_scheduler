import React from 'react';
import ResetPassword from '../../components/ResetPassword';
import SignIn from '../../components/SignIn';
import { Avatar, CssBaseline, Link, Box, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GeneralState } from '../../store/user/models';
import clsx from 'clsx';
import { useStyles } from '../../util/styles';

interface Props {
  userState: GeneralState | undefined;
  hasSetPassword: boolean | undefined;
}

export const Login: React.FC<Props> = ({ hasSetPassword, userState }) => {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: userState?.data ? true : false,
    [classes.buttonFailure]: userState?.error ? true : false,
    [classes.avatar]: true,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={buttonClassname}>
          <LockOutlined color="primary" />
        </Avatar>

        {/* RENDER SIGN IN / UP */}
        {hasSetPassword !== undefined && !hasSetPassword ? <ResetPassword /> : <SignIn />}

        {/* 
          <Grid item xs>
            <Link variant="body2">Forgot password?</Link>
          </Grid> 
        */}
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit">Richard Trevorrow</Link> {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
};
