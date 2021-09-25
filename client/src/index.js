import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';

// STYLES
import './assets/css/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// PAGES
import Eleitores from './pages/Eleitores';
import Login from './pages/Login';

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
    <div className="container">
      <h1 className="heading">Lista</h1>
      <Eleitores screen={screen} setScreen={setScreen}/>
      <button type="submit" className="btn btn-primary" onClick={deleteCookie}>Logout</button>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('auth');

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
    <div className="app">
      {screen === 'auth'
        ? <Login screen={screen} setScreen={setScreen} />
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);