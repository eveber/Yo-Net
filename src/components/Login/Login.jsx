import React from 'react';
import css from './Login.module.scss';
import {Field, reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {maxLength, requiredField} from "../../utils/validators";
import {CustomFormControl} from "../common/CustomControls/CustomControls";

let maxLenth50 = maxLength(50);

//Login form
let LoginForm = React.memo((props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.login__form_login}>
            {props.error && <div className={css.site_form_errors_block}>Ошибка: {props.error}!</div>}
            <Field component={CustomFormControl}
                   tag="input"
                   validate={[requiredField, maxLenth50]}
                   name="login"
                   type="text"
                   placeholder="Логин" />
            <Field component={CustomFormControl}
                   tag="input"
                   validate={[requiredField, maxLenth50]}
                   name="password"
                   type="password"
                   placeholder="Пароль"/>
            <div className={css.login__checkbox_wrapper}>
                <Field component="input" name="rememberMe" type="checkbox"/><label htmlFor="">Запомнить меня</label>
            </div>
            {props.captchaUrl &&
            <div className={css.login__captcha_wrapper}>
                <label htmlFor="">Введите код который на рисунке:</label>
                <img src={props.captchaUrl} alt="captcha"/>
                <div>
                    <Field component={CustomFormControl}
                           tag="input"
                           validate={[requiredField, maxLenth50]}
                           name="captcha"
                           type="text"
                           placeholder="Проверочный код" />
                    <span onClick={props.refreshCaptcha}><i className="fas fa-sync">{null}</i></span>
                </div>
            </div>
            }
            <button className={`${css.login__login_btn} ${css.site_button}`}>
                Войти
            </button>
        </form>
    )
});

//Connect LoginForm to Redux Form
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

//Login Component
let Login = React.memo((props) => {

    let onLogin = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha);
    };

    if (props.isWaiting) return <Preloader/>;
    if (props.isAuth) return <Redirect to='/Profile'/>;

    return (
        <div className={css.login}>
            <div className={`${css.login__content} ${css.site_block}`}>
                <div>
                    <h1>Вход:</h1>
                    <LoginReduxForm onSubmit={onLogin}
                                    captchaUrl={props.captchaUrl}
                                    refreshCaptcha={props.refreshCaptcha}/>
                </div>
            </div>
        </div>
    )
});

export default Login;