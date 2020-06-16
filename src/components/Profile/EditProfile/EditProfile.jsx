import React, {useState} from "react";
import css from './EditProfile.module.scss';
import {Field, reduxForm} from "redux-form";
import {CustomFormControl} from "../../common/CustomControls/CustomControls";

let EditProfileForm = React.memo((props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={css.editProfile__form_item}>
                <label htmlFor="">Полное имя:</label>
                <Field component={CustomFormControl}
                       tag="input"
                       name='fullName'
                       type="text"
                       placeholder="Полное имя"/>
            </div>
            <div className={`${css.editProfile__form_item} ${css.editProfile__checkBox_wrapper}`}>
                <Field component="input"
                       name="lookingForAJob"
                       type="checkbox" /><label htmlFor="">Поиск работы</label>
            </div>
            <div className={css.editProfile__form_item}>
                <label htmlFor="">Интересующая работа:</label>
                <Field component={CustomFormControl}
                       tag="textarea"
                       name='lookingForAJobDescription'
                       type="text"
                       placeholder="Интересующая работа"/>
            </div>
            <div className={css.editProfile__form_item}>
                <label htmlFor="">Обо мне:</label>
                <Field component={CustomFormControl}
                       tag="textarea"
                       name='aboutMe'
                       type="text"
                       placeholder="Обо мне"/>
            </div>
            {
                Object.keys(props.initialValues.contacts).map((key) => {
                    return (<div key={key} className={css.editProfile__form_item}>
                        <label htmlFor="">{key}</label>
                        <Field component={CustomFormControl}
                               tag="input"
                               name={'contacts.' + key}
                               type="text"
                               placeholder={props.initialValues.contacts[key]}/>
                    </div>)
                })
            }
            <div className={css.editProfile__buttons_block}>
                <button className={css.site_button}>Сохранить</button>
            </div>
            {
                props.error &&
                <div className={css.site_form_errors_block}>
                    <div className={css.error_title}><b>Ошибка!</b></div>
                    <div><i>{props.error}!</i></div>
                </div>
            }
        </form>
    )
});

//Connect EditProfileForm to redux form
let EditProfileReduxForm = reduxForm({form: 'editProfileForm'})(EditProfileForm);

let EditProfile = React.memo((props) => {

    let onUpdateProfile = (formData) => {
        props.updateUserProfile(formData);
    };

    return (
        <div className={css.editProfile__content}>
            <h1>Редактирование профиля:</h1>
            <EditProfileReduxForm onSubmit={onUpdateProfile} initialValues={props.initialValues}/>
        </div>
    )
});

export default EditProfile;