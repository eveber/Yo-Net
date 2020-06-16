import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {compose} from "redux";


class HeaderContainer extends React.Component {

    render() {
        return (
            <>
                <Header {...this.props} />
            </>
        )
    }
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userPhotoUrl: state.auth.userPhotoUrl,
        userProfile: state.profilePage.userProfile
    }
};

export default compose(
    connect(mapStateToProps, {logout}),
)(HeaderContainer);