/** @format */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import AllTask from './AllTask';
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
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
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
    alignItems: 'center',
    marginLeft: '40%',
    backgroundColor: '#109CF1',
  },
  color: {
    // background: '#d1c4e9',
    //background: '#E2D8D8',
    marginTop: 0,
  },
}));

export default function AddbodyAndShow() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [badRequest, setBadRequest] = useState(false);
  const [TaskObject, setTaskObject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [tasksAdded, setTasksAdded] = useState(false);
  const [signUpPage, setSignUpPage] = useState(true);

  const authorization = localStorage.getItem('accessToken');
  const xrefresh = localStorage.getItem('refreshToken');

  const token = {
    headers: { authorization, xrefresh },
  };
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/task`, token)
      .then((response) => {
        setTasks(response.data.tasks);
        //console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
        }
      });
  }, []);

  const buildObject = (evt: any) => {
    evt.preventDefault();

    let tempTaskObject: {
      title: string;
      body: string;
    };
    tempTaskObject = {
      title,
      body,
    };
    setTaskObject(tempTaskObject);
    //setTaskObject(TaskObject);
    // console.log({ TaskObject });
    //console.log({ tempTaskObject });

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addtask`, tempTaskObject, token)
      .then((response) => {
        setBadRequest(false);
        //console.log({ response });
        setTitle('');
        setBody('');
        setTasksAdded(true);
      })
      .catch((error) => {
        //  console.log(error);
        setBadRequest(true);
        setTitle('');
        setBody('');
      });

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/task`, token)
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/session`, token)
      .then((response) => {
        // console.log('Deleted');
        setSignUpPage(false);
      })
      .catch((error) => {
        if (error.response) {
          //console.log(error.response);
        }
      });
  };
  const classes = useStyles();
  return (
    <div>
      {signUpPage ? (
        <Container className={classes.color} maxWidth='lg'>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component='h1' variant='h5'>
                Create New Task
              </Typography>

              <form className={classes.form} noValidate onSubmit={buildObject}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete='fname'
                      name='firstName'
                      variant='outlined'
                      required
                      fullWidth
                      id='title'
                      autoFocus
                      value={title}
                      label='Title'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      style={{ height: 100 }}
                      label='Description'
                      variant='outlined'
                      required
                      fullWidth
                      id='body'
                      autoComplete='email'
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </Grid>
                  {badRequest ? 'Bad Request' : tasksAdded ? 'Task Added SuccessFully' : ''}
                </Grid>

                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Add Task
                </Button>
                <Grid item>
                  <Button onClick={logout} type='submit' variant='contained'>
                    <Link variant='body2'>Logout</Link>
                  </Button>
                </Grid>
              </form>
              <Typography component='h1' variant='h5'>
                All Tasks
              </Typography>

              {tasks.map((name: any) => (
                <div key={name._id}>
                  {/* <h1>{name.title}</h1> */}

                  <Grid item xs={12} sm={6}>
                    {<AllTask description={name.body} _id={name._id} title={name.title} />}
                  </Grid>
                  {/* <p>{name.body}</p> */}
                </div>
              ))}
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        </Container>
      ) : (
        <SignInSide />
      )}
    </div>
  );
}
