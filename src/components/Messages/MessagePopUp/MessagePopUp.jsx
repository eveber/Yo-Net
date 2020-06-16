import React, {useEffect, useRef} from 'react';
import css from './MessagePopUp.module.scss';
import no_avatar from '../../../assets/images/profile/no_avatar.png';
import {Field, reduxForm} from "redux-form";
import {CustomFormControl} from "../../common/CustomControls/CustomControls";
import {NavLink} from "react-router-dom";

//Message text form
let MessagePopUpForm = React.memo((props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.messagePopUp__send_form}>
            <Field component={CustomFormControl}
                   tag="textarea"
                   validate={[]}
                   name="popUpMessageText"
                   type="text"
                   placeholder="Введите сообщение" />
            <div className={css.send_button_wrapper}>
                <button className={css.site_button}>
                    Отправить
                </button>
            </div>
        </form>
    )
});

//Connect Message text form to Redux Form
const MessagePopUpReduxForm = reduxForm({form: 'login'})(MessagePopUpForm);

//MessagePopUp Component
let MessagePopUp = React.memo((props) => {

    //Outside click
    let popUp = useRef();
    useEffect(() => {
        const listener = (e) => {
            if (!popUp.current.contains(e.target)) {
                props.setPopUpMode(false);
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    });

    //Send Message Function
    let onSendMessage = () => {
        alert('The message is send!');
    };

    return (
        <div className={css.messagePopUp}>
            <div className={css.messagePopUp__body} ref={popUp}>
                <div className={css.messagePopUp__header}>
                    <span>Новое сообщение</span>
                    <span onClick={() => props.setPopUpMode(false)}>
                        <i className="fas fa-times">{null}</i>
                    </span>
                </div>

                <div className={css.messagePopUp__content}>
                    <div className={css.messagePopUp__user_data_wrapper}>
                        <div className={css.avatar_wrapper}>
                            <NavLink to={'/profile/' + props.userId}>
                                <img src={props.userAvatar || no_avatar} alt="avatar"/>
                            </NavLink>
                        </div>
                        <div className={css.user_info}>
                            <NavLink to={'/profile/' + props.userId} className={css.user_name}>
                                {props.userName}
                            </NavLink>
                            {
                                props.isFriend
                                ? <span className={css.friend_status}>Друг</span>
                                : <span className={css.friend_status}>Не в друзьях</span>
                            }
                        </div>
                    </div>
                    <MessagePopUpReduxForm onSubmit={onSendMessage}/>
                </div>
            </div>
        </div>
    )
});

export default MessagePopUp;