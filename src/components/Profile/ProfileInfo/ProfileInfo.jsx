import css from "./ProfileInfo.module.scss";
import React, {useState} from "react";
import EditProfile from "../EditProfile/EditProfile";

let ProfileDataMore = React.memo((props) => {
    return (
        <div className={css.profile__user_data_more}>
            {
                Object.keys(props.contacts).map((key) => <div key={key} className={css.profile__data_more_item}>
                    <div className={css.profile__user_data_name}>{key}:</div>
                    {
                        props.contacts[key]
                            ? <div className={css.profile__user_data_value}>
                                <span className={css.site_link}>{props.contacts[key]}</span>
                            </div>
                            : <span>Отсутствует</span>
                    }
                </div>)
            }
        </div>
    )
});

let ProfileInfo = React.memo((props) => {

    //Show/hide more info
    let [profileShowMoreInfoMode, setProfileShowMoreInfoMode] = useState(false);
    let onShowMoreInfo = () => {
        !profileShowMoreInfoMode
            ? setProfileShowMoreInfoMode(true)
            : setProfileShowMoreInfoMode(false);
    };

    //User status text change
    let [userStatusText, setUserStatusText] = useState(props.profileUserStatus);
    let onStatusTextChange = (e) => {
        setUserStatusText(e.currentTarget.value);
    };

    //User status edit
    let [userStatusEditMode, setUserStatusEditMode] = useState(false);
    let activateEditMode = () => {
        props.isOwner && setUserStatusEditMode(true);
    };

    let deactivateEditMode = () => {
        setUserStatusEditMode(false);
        if (props.profileUserStatus !== userStatusText) {
            props.updateStatus(userStatusText);
        }
    };

    //Profile edit
    let [profileEditMode, setProfileEditMode] = useState(false);
    let onProfileEditMode = () => {
        profileEditMode ? setProfileEditMode (false) : setProfileEditMode (true);
    };

    return (
        <div className={`${css.profile__info_block}  ${css.site_block}`}>
            <div className={css.profile__name_wrapper}>
                <div className={css.profile__username}>
                    {props.fullName}
                </div>
                <div className={css.profile__edit_profile}>
                    { props.isOwner &&
                        <button className={css.site_button} onClick={onProfileEditMode}>
                            <i className="fas fa-edit">{null}</i>
                        </button>
                    }
                </div>
            </div>
            {
                //Status control
                !userStatusEditMode ?
                    <div className={css.profile__user_status} onClick={activateEditMode}>
                        {props.profileUserStatus || 'Нет статуса..'}
                    </div>
                    : <input type="text"
                             className={css.site_input}
                             onBlur={deactivateEditMode}
                             onChange={onStatusTextChange}
                             autoFocus={true}
                             value={userStatusText}
                    />
            }
            <div className={css.site_devider}>{null}</div>

            {
                !profileEditMode ?
                <div>
                    <div className={css.profile__user_data}>
                        <div className={css.profile__user_data_name}>Поиск работы:</div>
                        <div
                            className={css.profile__user_data_value}>{props.lookingForAJob ? 'В поиске' : 'Уже работаю'}</div>
                    </div>
                    {
                        props.lookingForAJob
                            ? <div className={css.profile__user_data}>
                                <div className={css.profile__user_data_name}>Интересующая работа:</div>
                                <div className={css.profile__user_data_value}>{props.lookingForAJobDescription}</div>
                            </div>
                            : null
                    }
                    <div className={css.profile__user_data}>
                        <div className={css.profile__user_data_name}>О себе:</div>
                        <div className={css.profile__user_data_value}>{props.aboutMe}</div>
                    </div>
                    <div className={css.profile__user_data}>
                        <div className={css.profile__more_empty}>{null}</div>
                        <a href="#" className={`${css.profile__more_info_link} ${css.site_link}`}
                           onClick={onShowMoreInfo}>
                            {
                                !profileShowMoreInfoMode ? 'Показать подробную информацию' : 'Скрыть подробную информацию'
                            }
                        </a>
                    </div>
                    {
                        profileShowMoreInfoMode && <ProfileDataMore contacts={props.contacts}/>
                    }
                </div>
                : <EditProfile updateUserProfile={props.updateUserProfile}
                               initialValues={props.userProfile}
                               setProfileEditMode={setProfileEditMode} />
            }

        </div>
    )
});

export default ProfileInfo;