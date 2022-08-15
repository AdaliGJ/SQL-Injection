import React, {useRef, useContext, useState, useEffect} from 'react';
import {LoginContext} from "../../Context/LoginContext.js";
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import './login.scss'
/*import './../../App.css'*/
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuBar from "./../AppBar/appBar.js";



function Login(props){

    const { setUsername, username, tipoUsuario, setTipoUsuario }=useContext(LoginContext);
    const [result, setResult]=useState('hola');
    const [msg, setMsg]=useState('');
    const[error, setError]=useState(false);
    const [change, setChange]=useState('hola');
        
    const usuarioRef = useRef(null);
    const contRef = useRef(null);
    const resultRef = useRef('');

    const history = useHistory();

       const handleLogin=()=>{

                //Backend sin protección de SQL Injection
                const url = 'http://localhost/sqlinjection1/login.php';


                //Backend con protección de SQL Injection
                //const url = 'http://localhost/sqlinjection1/login2.php';


                let formData = new FormData();
                formData.append('user',usuarioRef.current.value);
                formData.append('clave', contRef.current.value);

                console.log(usuarioRef.current.value);
                console.log(contRef.current.value);
                axios.post(url, formData)
                .then(function (response) {
                    console.log(response);
                    setUsername(usuarioRef.current.value);
                    setTipoUsuario(response.data);
                    history.push('/home');
                })
                .catch(function (response) {
                    console.log(response);
                    setError(true);
                    setMsg("Error: usuario o contraseña incorrectos");
                    setUsername('');
                    setTipoUsuario('');
                });

                //

                console.log(username);
                console.log(tipoUsuario);
                console.log(msg);

        }

        useEffect(()=>{
            setChange(result);
          }, [result])


        return(
            <div className="login">
            <MenuBar/>
                <Card className="login_form" mt={5}>
                <CardContent id="content">
                <div className="content-form">
                    <h1>Login SQL Injection</h1>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <TextField className="standard-basic" label="Nombre de usuario" InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircleIcon />
                                  </InputAdornment>
                                ),
                              }} inputRef={usuarioRef}/>
                        </Grid>
                        <Grid item>
                            <TextField className="standard-basic" label="Contraseña" /*type="password"*/  InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockIcon />
                                  </InputAdornment>
                                ),
                              }} inputRef={contRef}/>
                        </Grid>
                    </Grid>
                    </div>
                </CardContent>
                <CardActions>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item id={error ? "error": "noerror"}>
                            <Alert severity="error">{msg}</Alert>
                        </Grid>
                        <Grid item>
                            <Button id="enviar" variant="contained" onClick={handleLogin}>Inicar Sesión</Button>
                        </Grid>
                        <p>{tipoUsuario}</p>
                    </Grid>
                </CardActions>
                </Card>
            </div>
        );

}

export default Login;