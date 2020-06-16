import React, {useState} from 'react';
import css from './Dialog.module.scss';
import no_avatar from "../../../assets/images/profile/no_avatar.png";
import {NavLink, Redirect} from "react-router-dom";

let Dialog = React.memo((props) => {
    return (
                <div className={css.dialog}>
                    <div className={css.dialog__wrapper}>
                        <div className={css.header}>
                            <div className={css.content}>
                                <NavLink to={'/messages'} className={css.btn_back}>
                                    <i className="fas fa-chevron-left">{null}</i> Назад</NavLink>
                                <span className={css.name}>Алексей Навальный</span>
                                <img src={no_avatar} alt="avatar" className={css.sender_avatar}/>
                            </div>
                        </div>
                        <div className={css.body}>
                            <div>Lorem ipsum.</div>
                            <div>Quia, voluptatibus.</div>
                        </div>
                        <div className={css.footer}>
                            <div className={css.content}>
                                <textarea className={css.site} placeholder={'Введите сообщение'} cols="80"/>
                            </div>
                        </div>
                    </div>
                    {/*<div className={css.dialog__right_block}>{null}</div>*/}
                </div>
    )
});

export default Dialog;