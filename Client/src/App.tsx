/** @format */
//import LogIn from './components/LogIn';'
import axios from 'axios';
import React from 'react';
import AddTaskAndView from './components/AddTaskAndView';
import SignUp from './components/SignUp';
//import Registration from './components/Registration';

function App() {
  //const backEndUrl: string = process.env.REACT_APP_BASE_URL as string;
  const backEndUrl: string = 'http://localhost:5000/task';

  const [loggedIn, setloggedIn] = React.useState(false);
  const [forbidden, setForbidden] = React.useState(true);

  const authorization = localStorage.getItem('accessToken');
  const xrefresh = localStorage.getItem('refreshToken');

  const token = {
    headers: { authorization, xrefresh },
  };
  //console.log({ token });
  React.useEffect(() => {
    axios
      .get(`${backEndUrl}`, token)
      .then((response) => {
        if (response.data.isUser) {
          setloggedIn(true);
        } else {
          setForbidden(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          //console.log(error.response.data);
          if (error.response.status === 403) setForbidden(false);
        }
      });
  }, []);

  return <div>{forbidden ? <AddTaskAndView /> : <SignUp />}</div>;
}

export default App;
