import React, {useContext} from 'react';
import './home.scss'
import MenuBar from "../AppBar/appBar";
import {LoginContext} from "../../Context/LoginContext.js";


class Home extends React.Component{
    
    static contextType = LoginContext;
    
    
    componentDidMount(){
        const context = this.context;
        this.setState({username: context.username,
        tipo_usuario: context.tipoUsuario});
        
    }
    
    render(){
        return(
            <div>
                <MenuBar/>
                <div className="home">
                    <h1>{"Hola " + this.context.username}</h1>
                    <p>{"Tus datos: " + /*JSON.stringify(*/this.context.tipoUsuario/*)*/}</p> 
                    
                </div>

            </div>
        );
    }
}

export default Home;