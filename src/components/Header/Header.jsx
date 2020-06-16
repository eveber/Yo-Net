import React, {useEffect, useState} from 'react';
import css from './Header.module.scss';
import logo from '../../assets/images/header/logo.png';
import no_avatar from '../../assets/images/profile/no_avatar.png'
import {NavLink} from "react-router-dom";

let HeaderMenu = React.memo((props) => {

    return (
        <nav className={css.header__menu}>
            <ul>
                <li><NavLink to="/profile">Моя страница</NavLink></li>
                <li><NavLink to="#">Настройки</NavLink></li>
                <li><NavLink to="#">Помощь</NavLink></li>
                <li><NavLink onClick={props.logout} to="#">Выход</NavLink></li>
            </ul>
        </nav>
    )
});

let Header = React.memo((props) => {
    //Show/Hide header menu
    let [headerMenuShowStatus, setHeaderMenuShowStatus] = useState(false);

    let onShowMenu = () => {
        !headerMenuShowStatus
            ? setHeaderMenuShowStatus(true)
            : setHeaderMenuShowStatus(false);
    };

    useEffect(() => {
        document.onclick = (e) => {
            let headerUserLink = document.getElementById('header-user-link');
            if (!headerUserLink.contains(e.target)) {
                setHeaderMenuShowStatus(false);
            }
        };
    });

    return (
        <header className={css.header}>
            <div className={`${css.header__content} ${css.container}`}>
                <div className={css.header__logo}>
                    <NavLink to="/profile"><img src={logo} alt="logo"/></NavLink>
                </div>

                {props.isAuth ?
                    <div className={css.header__user}>
                        <div id="header-user-link"
                             tabIndex="0"
                             className={!headerMenuShowStatus
                                 ? css.header__user_link
                                 : `${css.header__user_link} ${css.header__user_link_active}`
                             }
                             onClick={onShowMenu}>
                            <div className={css.header__user_name}>
                                {props.login}
                            </div>
                            <div className={css.header__user_photo}>
                                {
                                    props.userPhotoUrl ?
                                        <img src={props.userPhotoUrl} alt="avatar"/>
                                        : <img src={no_avatar} alt="avatar"/>
                                }
                            </div>
                            <div className={css.header__chevron}>
                                <i className={!headerMenuShowStatus
                                    ? "fas fa-chevron-right"
                                    : "fas fa-chevron-down"}>{null}
                                </i>
                            </div>
                        </div>
                        {headerMenuShowStatus && <HeaderMenu logout={props.logout} />}
                    </div>
                    : <NavLink to="/login" id="header-user-link" className={css.header__user_login}>
                        Войдите приложение!</NavLink>
                }
            </div>
        </header>
    )
});

export default Header;