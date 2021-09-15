/** @format */
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useState } from 'react';
import SignInSide from './SignInSide';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright Mojahid '}
      <Link color='inherit' href='https://islamshaheb.github.io/'>
        Website
      </Link>{' '}
      {new Date().getFullYear()}
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

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setRePassword] = useState('');
  const [badRequest, setBadRequest] = useState(false);
  const [saved, setsaved] = useState(false);
  const [userObject, setUserObject] = useState({});
  const [signInPage, setSignInPage] = useState(true);
  const classes = useStyles();

  const buildObject = (evt: any) => {
    evt.preventDefault();

    let tempUserObject: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    };
    tempUserObject = {
      name,
      email,
      password,
      passwordConfirmation,
    };
    setUserObject(tempUserObject);
    //setUserObject(userObject);
    // console.log({ userObject });
    //console.log({ tempUserObject });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/reg`, tempUserObject)
      .then((response) => {
        setBadRequest(false);
        setsaved(true);
        setSignInPage(false);
        //console.log({ response });
      })
      .catch((error) => {
        setBadRequest(true);
        setsaved(false);
        //console.log({ error });
      });
    if (saved) {
      setName('');
      setEmail('');
      setPassword('');
      setRePassword('');
      setsaved(false);
    }
  };

  const changeToSignUp = () => {
    setSignInPage(false);
  };
  //console.log({ signInPage });
  return (
    <div>
      {signInPage ? (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={buildObject}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    fullWidth
                    id='name'
                    label='Full name'
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='passwordConfirmation'
                    label='Re enter Password'
                    type='password'
                    name='lastName'
                    autoComplete='lname'
                    value={passwordConfirmation}
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              {badRequest ? 'Bad Request' : saved ? '' : ''}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <button onClick={changeToSignUp}>
                    <Link variant='body2'>Already have an account? Sign in</Link>
                  </button>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      ) : (
        <SignInSide />
      )}
    </div>
  );
}
