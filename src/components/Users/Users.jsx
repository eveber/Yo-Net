import React, {useState} from 'react';
import css from './users.module.scss';
import no_avatar from '../../assets/images/profile/no_avatar.png';
import {NavLink} from "react-router-dom";
import Paginator from "../common/Pagination/Paginator";
import {Field, reduxForm} from "redux-form";
import {CustomFormControl} from "../common/CustomControls/CustomControls";
import MessagePopUp from "../Messages/MessagePopUp/MessagePopUp";

let User = React.memo((props) => {

    let [popUpMode, setPopUpMode] = useState(false);

    let onPopUpModeActivate = () => {
        setPopUpMode (true);
    };

    return (
        <div className={`${css.users__body_wrapper} ${css.site_block}`}>
            <div className={css.users__data_wrapper}>
                <div className={css.users__avatar}>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small || no_avatar} alt="avatar"/>
                    </NavLink>
                </div>
                <div className={css.users__data_block}>
                    <div className={css.users__user_name}>
                        <NavLink to={'/profile/' + props.user.id}>
                            {props.user.name}
                        </NavLink>
                    </div>
                    <div className={css.users__info}>
                        {props.user.status || 'Нет статуса'}
                    </div>
                    <div className={css.users__send_message}>
                        <span className={css.site_link} onClick={onPopUpModeActivate}>
                            <i className="far fa-envelope">{null}</i> Написать сообщение
                        </span>
                        {popUpMode && <MessagePopUp
                            userId={props.user.id}
                            userName={props.user.name}
                            userAvatar={props.user.photos.small}
                            isFriend={props.user.followed}
                            setPopUpMode={setPopUpMode} />}
                    </div>
                </div>
                <div className={css.users__follow_wrapper}>
                    {
                        !props.user.followed
                            ? <button onClick={() => props.followUser(props.user.id)}
                                      disabled={props.followingUsers.some((id) => id === props.user.id)}
                                      className={css.site_button}>Добавить</button>

                            : <button onClick={() => props.unFollowUser(props.user.id)}
                                      disabled={props.followingUsers.some((id) => id === props.user.id)}
                                      className={css.site_button}>Удалить</button>
                    }
                </div>
            </div>
        </div>
    )
});


//User search form
let UserSearchForm = React.memo((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={CustomFormControl}
                   tag="input"
                   name="userSearchField"
                   type="text"
                   placeholder="Поиск пользователей"/>
            <button className={css.site_button}><i className="fas fa-search">{null}</i></button>
        </form>
    )
});

//Connect UserSearchForm to Redux Form
const UserSearchReduxForm = reduxForm({form: 'userSearchForm'})(UserSearchForm);

let Users = React.memo((props) => {

    //Pagination page click
    let onCurrentPageClick = (page) => {
        let count = props.usersPageSize;
        let term = props.searchTerm;
        let queryType = props.queryType;
        switch (queryType) {
            case 'getFoundUsers':
                props.getUsers(count, page, term, false, 'getFoundUsers');
                break;

            case 'getFriends':
                props.getUsers(count, page, '', true, 'getFriends');
                break;

            default:
                props.getUsers(count, page, '', false, 'getAllUsers');
        }
    };

    //Search functions
    let onUserSearch = (formData) => {
        let term = formData.userSearchField;
        props.getUsers(props.usersPageSize, 1, term, false, 'getFoundUsers');
    };

    let onGetFriends = () => {
        props.getUsers(props.usersPageSize, 1, '', true, 'getFriends');
    };

    let onGetAllUsers = () => {
        props.getUsers(props.usersPageSize, 1, '', false, 'getAllUsers');
    };

    return (
        <>
            <div className={css.users}>
                <div className={css.users__left_block}>

                    <Paginator totalUsersCount={props.totalUsersCount}
                               usersPageSize={props.usersPageSize}
                               currentPage={props.currentPage}
                               onCurrentPageClick={onCurrentPageClick}
                    />

                    <div className={`${css.users__select_people} ${css.site_block}`}>
                        <button className={css.site_button} onClick={onGetAllUsers}>
                            <i className="fas fa-users">{null}</i>Все пользователи
                        </button>
                        <button className={css.site_button} onClick={onGetFriends}>
                            <i className="fas fa-user-friends">{null}</i>Друзья
                        </button>
                    </div>

                    <div className={`${css.users__search} ${css.site_block}`}>
                        <UserSearchReduxForm onSubmit={onUserSearch} />
                    </div>

                    {props.users.map(u => <User key={u.id}
                                                user={u}
                                                followUser={props.followUser}
                                                unFollowUser={props.unFollowUser}
                                                followingUsers={props.followingUsers}
                    />)}
                </div>
                <div className={css.users__right_block}>{null}</div>
            </div>
        </>
    )
});

export default Users;