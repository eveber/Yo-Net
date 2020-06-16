import React from 'react';
import css from './Posts.module.scss';
import my_avatar from '../../../assets/images/profile/my_avatar.jpg';


let Post = React.memo((props) => {

    return (
        <div className={`${css.profile__post_body_wrapper}  ${css.site_block}`}>
            <div className={css.profile__data_wrapper}>
                <div className={css.profile__avatar_middle}>
                    <img src={my_avatar} alt="avatar"/>
                </div>
                <div className={css.profile__post_data_block}>
                    <div className={css.profile__post_user_name}><a href="#">
                        Евгений Вебер
                    </a></div>
                    <div className={css.profile__post_date}>
                        6 мая 2020
                    </div>
                </div>
            </div>

            <div className={css.profile__post_text}>
                {props.postText}
            </div>
        </div>
    )
});

export default Post;