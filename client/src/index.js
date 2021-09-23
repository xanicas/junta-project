import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import axios from 'axios';

import Eleitores from './pages/Eleitores';

function View(props) {
  const { screen, setScreen } = props;

  const deleteCookie = async () => {
    try {
      await axios.get('/api/clear-cookie');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>{screen}</p>
      <Eleitores />
      <button onClick={deleteCookie}>Logout</button>
    </div>
  );
}

function App() {

  const [screen, setScreen] = useState('auth');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const auth = async () => {
    try {
      const res = await axios.get('/api/authenticate', { auth: { username, password } });

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const readCookie = async () => {
    try {
      const res = await axios.get('/api/read-cookie');

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === 'auth'
        ? <div>
          <label>Username: </label>
          <br />
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <br />
          <label>Password: </label>
          <br />
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br />
          <button onClick={auth}>Login</button>
        </div>
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
