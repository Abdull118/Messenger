import { Button } from "@mui/material";
import React from "react";
import "./login.css"
import {auth, provider} from "./firebase"
function Login(){

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }

    const signInG = () =>{
        auth.signInAnonymously().catch((error) => alert(error.message))
    }

    return (
        <div className="login">
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png"/>

                <h1>Messenger</h1>
                </div>
                <Button onClick={signIn}> Sign In</Button>
            <Button onClick={signInG}> Sign In as Guest</Button>
        </div>
    )
}

export default Login