import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    addPost, getProfile, getStatus, saveProfilePhoto,
    updateStatus, updateUserProfile
} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hocs/withAuthRedirect";

class ProfileContainer extends React.Component {

    refreshProfile() {
        //getProfile
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
        }

        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <>
                {this.props.isWaiting
                    ? <Preloader/>
                    : this.props.userProfile && <Profile {...this.props}
                                                         isOwner={!this.props.match.params.userId} />}
            </>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        isWaiting: state.profilePage.isWaiting,
        userProfile: state.profilePage.userProfile,
        profileUserStatus: state.profilePage.profileUserStatus,
        profilePosts: state.profilePage.profilePosts,
        isAuth: state.auth.isAuth,
        autorizedUserId: state.auth.userId
    }
};

export default compose(
    connect(mapStateToProps, {
        addPost, getProfile,
        getStatus, updateStatus,
        saveProfilePhoto, updateUserProfile}),
    withRouter,
    withAuthRedirect //Redirect to login if not login
)(ProfileContainer);