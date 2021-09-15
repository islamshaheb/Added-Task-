/** @format */

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useState } from 'react';
import AddTaskAndView from './AddTaskAndView';
import SignUp from './SignUp';
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © Mojahid '}
      <Link color='inherit' href='https://islamshaheb.github.io/'>
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [signInPage, setSignInPage] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userObject, setUserObject] = useState({});
  const [badRequest, setBadRequest] = useState(false);
  const [taskPage, setTaskPage] = useState(false);

  const buildObject = (evt: any) => {
    evt.preventDefault();

    let tempUserObject: {
      email: string;
      password: string;
    };
    tempUserObject = {
      email,
      password,
    };
    setUserObject(tempUserObject);
    //setUserObject(userObject);
    // console.log({ userObject });

    //{ headers: { Authorization: `JWT}` }
    //console.log({ tempUserObject });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/session`, tempUserObject)
      .then((response) => {
        // console.log({ response });
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setTaskPage(true);
      })
      .catch((error) => {
        //console.log({ error });
        setBadRequest(true);
        setPassword('');
      });
  };

  const changeToSignUp = () => {
    setSignInPage(false);
  };

  return (
    <div>
      {signInPage ? (
        !taskPage ? (
          <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={buildObject}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
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
                  {badRequest ? 'Bad Request' : ''}
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='#' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <button onClick={changeToSignUp}>
                        <Link variant='body2'>Don't have an account? Sign Up</Link>
                      </button>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        ) : (
          <AddTaskAndView />
        )
      ) : (
        <SignUp />
      )}
    </div>
  );
}
