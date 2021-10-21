import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Menu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <nav>
            <NavLink exact to={process.env.PUBLIC_URL + '/'}>Play!</NavLink>
            <NavLink to={process.env.PUBLIC_URL + '/my-stories'}>My stories</NavLink>
            {
                isLoggedIn?
                <Button>Logout</Button>
                :
                <NavLink to={process.env.PUBLIC_URL + '/login'}>Login/Register</NavLink>
            }
        </nav>
    )
}

export default Menu;