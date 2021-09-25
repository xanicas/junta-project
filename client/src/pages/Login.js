import React, { useState } from "react";
import axios from 'axios';

function Login(props) {
    const { screen, setScreen } = props;
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

    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Login</h3>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" onClick={auth}>Login</button>
                </div>
            </div>
        </div >
    );
}

export default Login;
