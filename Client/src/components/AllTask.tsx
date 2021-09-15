/** @format */

import { CircularProgress, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '1%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    flex: 2,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
    color: '#4C5862',
    fontFamily: 'Poppins',
    textAlign: 'justify',
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    padding: '6px',
    minWidth: 0,
    color: '#C2CFE0',
  },
});
interface TodoFields {
  _id: string;
  title: string;
  description: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AllTask(todo: TodoFields) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [load, setLoad] = useState(false);

  const authorization = localStorage.getItem('accessToken');
  const xrefresh = localStorage.getItem('refreshToken');

  const token = {
    headers: { authorization, xrefresh },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    setOpen(false);
    setLoad(true);

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/task/${todo._id}`,
        { title, body: description },
        token
      )
      .then((response) => {
        setLoad(false);
        window.location.reload();
        // console.log({ response });
      })
      .catch((error) => {
        //  console.log({ title });
        //console.log({ error });
      });
  };

  useEffect(() => {}, [load]);

  const deleteTask = () => {
    setLoad(true);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/task/:${todo._id}`, token)
      .then((response) => {
        setLoad(false);
        window.location.reload();
        //console.log({ response });
      })
      .catch((error) => {
        // console.log({ error });
      });
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <div style={{ display: 'flex' }}>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {todo.title}
          </Typography>
          <Dialog
            open={load}
            keepMounted
            onClose={() => {
              setLoad(false);
            }}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle id='alert-dialog-slide-title'>{'Loading'}</DialogTitle>
            <DialogContent>
              <CircularProgress />
            </DialogContent>
          </Dialog>
          <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
            <DialogTitle id='alert-dialog-slide-title'>{'Edit Todo'}</DialogTitle>

            <DialogContent>
              <Typography
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  width: '100%',
                }}
              >
                {' '}
                Todo Title
              </Typography>
              <TextField
                id='outlined-full-width'
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                // style={{ margin: 8 }}
                placeholder='Task Title'
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
              <Typography
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  width: '100%',
                  paddingTop: 10,

                  // fontWeight: "bold",
                  //textAlign: "center",
                }}
              >
                {' '}
                Todo Description
              </Typography>
              <TextField
                id='outlined-full-width'
                // style={{ margin: 8 }}
                placeholder='Task Description'
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
                multiline
                minRows='5'
                fullWidth
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Close
              </Button>
              <Button onClick={handleEdit} color='primary'>
                Edit
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{}}>
            <Button className={classes.button} onClick={handleClickOpen}>
              <Edit />
            </Button>

            <Button className={classes.button} onClick={deleteTask}>
              <Delete />
            </Button>
          </div>
        </div>
        <div>
          <Typography className={classes.content} gutterBottom>
            {todo.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
