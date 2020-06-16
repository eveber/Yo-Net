import React from 'react';
import css from './Sidenav.module.scss';
import {NavLink} from "react-router-dom";

let Sidenav = React.memo((props) => {

    return (
        <nav className={css.sidenav}>
            <ul className={css.sidenav__nav}>
                <li><NavLink to="/profile"><i className="fas fa-home">{null}</i>Моя страница</NavLink></li>
                <li><NavLink to="/users"><i className="fas fa-users">{null}</i>Люди</NavLink></li>
                <li><NavLink to="messages"><i className="fas fa-comments">{null}</i>Сообщения</NavLink></li>
            </ul>
        </nav>
    )
});

export default Sidenav;