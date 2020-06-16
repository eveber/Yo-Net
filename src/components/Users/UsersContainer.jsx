import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {useEffect} from "react";
import {followUser, getUsers, unFollowUser} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";

let UsersContainer = (props) => {

    useEffect(() => {
        //getUsers
        let count = props.usersPageSize;
        let page = props.currentPage;
        if (props.users.length === 0) {
            props.getUsers(count, page, '', false, 'getAllUsers');

        }
    });


    return (
        <>
            {props.isWaiting ? <Preloader /> : <Users {...props} />}
        </>
    )
};


let mapStateToProps = (state) => {
    return {
        isWaiting: state.usersPage.isWaiting,
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        usersPageSize: state.usersPage.usersPageSize,
        currentPage: state.usersPage.currentPage,
        queryType: state.usersPage.queryType,
        searchTerm: state.usersPage.searchTerm,
        followingUsers: state.usersPage.followingUsers
    }
};

export default compose(
    connect(mapStateToProps, {getUsers, followUser, unFollowUser}),
    withAuthRedirect
)(UsersContainer);

