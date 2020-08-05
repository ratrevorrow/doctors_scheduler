import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import * as actions from '../../store/actions';
import { UserState } from '../../store/signin/models';
import { Button, TextField, FormControlLabel, Checkbox, Typography, makeStyles } from '@material-ui/core';
import { signIn } from '../../store/selectors';
import { RootState } from '../../store/models';
import { Select } from 'antd';

const { Option } = Select;

interface Props {
  signIn: Routine;
  userState: UserState;
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn: React.FC<Props> = ({ signIn, userState }) => {
  const classes = useStyles();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const onSubmit = () => {
    console.log(email, password, role);
    const obj = {
      email: 'richxvafrd@test.com',
      password: 'zxxvcxfcz',
      role: 'PATIENT',
    };
    signIn(obj);
    // signIn({
    //   email: email,
    //   password: password,
    //   role: 'PATIENT',
    // });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
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
        <Select
          defaultValue="Patient"
          style={{ width: '100%' }}
          onChange={(roleSelected: string) => setRole(roleSelected)}
          size="large"
        >
          <Option value="PATIENT">Patient</Option>
          <Option value="DOCTOR">Doctor</Option>
          <Option value="RECEPTIONIST">Receptionist</Option>
        </Select>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={onSubmit}>
          Sign In
        </Button>
      </form>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({ userState: signIn.getUserState(state) });

const mapDispatchToProps = {
  signIn: actions.signIn.signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
