import React, {useState} from 'react';
import css from './AddPostArea.module.scss';
import my_avatar from '../../../assets/images/profile/my_avatar.jpg';
import {Field, reduxForm} from "redux-form";
import {CustomFormControl} from "../../common/CustomControls/CustomControls";
import {maxLength, requiredField} from "../../../utils/validators";

let maxLength300 = maxLength(300);

//AddPost form
let AddPostForm = React.memo((props) => {
    return (
        <form className={css.profile__form_add_post} onSubmit={props.handleSubmit}>
            <div className={css.profile__post_text_area_wrapper}>
                <Field className={css.site_textarea}
                       component={CustomFormControl}
                       tag="textarea"
                       validate={[]}
                       name="newPostText"
                       placeholder="Что у вас нового?"
                       onFocus={() => props.textAreaTransform(true)}
                       onBlur={() => props.textAreaTransform(false)}
                />
            </div>
            <div className={css.profile__add_post}>
                <button className={css.site_button}>
                    Отправить
                </button>
            </div>
        </form>
    )
});

//Connect form to "redux-form"
AddPostForm = reduxForm({form: 'addPostForm'})(AddPostForm);

let AddPostArea = React.memo((props) => {

    let onAddPost = (formData) => {
        if (formData.newPostText) {
            props.addPost(formData.newPostText);
        }
    };

    //Textarea transform onFocus/onBlur
    let [postTextAreaTransformMode, setPostTextAreaTransformMode] = useState(false);
    let textAreaTransform = (mode) => {
        setPostTextAreaTransformMode(mode);
    };

    return (
        <div className={`${css.profile__write_post_block} ${css.site_block}`}>
            <div className={!postTextAreaTransformMode
                ? css.profile__write_post_wrapper
                : `${css.profile__write_post_wrapper} ${css.post_wrapper_active}`}>
                <div className={css.profile__avatar_small}>
                    <img src={my_avatar} alt="avatar"/>
                </div>

                <AddPostForm onSubmit={onAddPost}
                             textAreaTransform={textAreaTransform}
                             postTextAreaTransformMode={postTextAreaTransformMode}
                />
            </div>
        </div>
    )
});

export default AddPostArea;