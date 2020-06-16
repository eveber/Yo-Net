import React from "react";
import {connect} from "react-redux";
import {login, refreshCaptcha} from "../../redux/auth-reducer";
import Login from "./Login";


class LoginContainer extends React.Component {

    render() {
        return (
            <>
                <Login {...this.props} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captcha
    }
};

export default connect(mapStateToProps, {login, refreshCaptcha})(LoginContainer);
