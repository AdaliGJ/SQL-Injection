import Login from "./components/Login/login";
import Home from "./components/Home/home";
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from "react-router-dom";
import {LoginContext} from "./Context/LoginContext.js";
import React, {useState,useEffect} from 'react';

function App() {

  const getUsername=()=>{
    const localUsername = localStorage.getItem('username');
    return localUsername ? JSON.parse(localUsername) : null;
  }

  const getTipoUsuario=()=>{
    const localTipoUsuario = localStorage.getItem('tipoUsuario');
    return localTipoUsuario ? JSON.parse(localTipoUsuario) : null;
  }


  const[username, setUsername] = useState(null);
  const[tipoUsuario, setTipoUsuario]=useState(null);

  useEffect(()=>{
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('tipoUsuario', JSON.stringify(tipoUsuario));
  })
  

  return (
    
    <Router>
      <div className="App">
        <LoginContext.Provider value={{username, setUsername, setTipoUsuario, tipoUsuario}}> 
        {username != '' && username != null?  <Switch>
            <Route exact path="/home" component={Home}/> 
            <Redirect path="/" to="/home" ></Redirect>
          </Switch>:
          <Switch>           
            <Route exact path="/login" component={Login}/>
            <Redirect path="/" to="/login"></Redirect>
          </Switch>}
        </LoginContext.Provider>  
    </div>
    </Router>

  );
}

export default App;
