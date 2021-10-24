import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';

const Menu = () => {
    const {user, logout} = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        user ? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [user])

    return(
        <nav>
            <NavLink exact to={process.env.PUBLIC_URL + '/'} activeClassName='current'>Play!</NavLink>
            <NavLink to={process.env.PUBLIC_URL + '/my-stories'} activeClassName='current'>My stories</NavLink>
            {
                isLoggedIn?
                <Button onClick={logout}>Logout</Button>
                :
                <NavLink to={process.env.PUBLIC_URL + '/login'} activeClassName='current'>Login/Register</NavLink>
            }
        </nav>
    )
}

export default Menu;