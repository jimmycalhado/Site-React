import  React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'
import { VscSignIn } from "react-icons/vsc";

function NavBar()  {
    return(
        <nav id="navbar">
            <h1 class="logo"> Movies List</h1>
            <h3 class="welcome">Seja Bem-Vindo </h3>
            <div class="butexit"><button class="exit"><Link to="/" class="link"><VscSignIn /></Link></button></div>
            
        </nav>
    )
}
export default NavBar;