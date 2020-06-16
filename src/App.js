import React from "react";
import css from "./App.module.scss";
import Sidenav from "./components/Sidenav/Sidenav";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hocs/withSuspense";
import Messages from "./components/Messages/Messages";
import Dialog from "./components/Messages/Dialog/Dialog";

//Lazy
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={css.layout}>
                <div className={css.layout__head_block}>
                    <HeaderContainer/>
                </div>
                <div className={`${css.layout__content} ${css.container}`}>
                    <div className={css.layout__sidenav_block}>
                        <Sidenav/>
                    </div>
                    <div className={css.layout__page_block}>
                        <Switch>
                            <Route render={withSuspense(LoginContainer)} path='/login'/>
                            <Route render={withSuspense(ProfileContainer)} path='/profile/:userId?'/>
                            <Route render={withSuspense(UsersContainer)} path='/users'/>
                            <Route render={withSuspense(Messages)} path='/messages'/>
                            <Route exact render={() => <Dialog />} path='/dialog'/>
                            <Route exact render={() => <Redirect to={'/profile'}/>} path='/'/>
                            <Route render={() => <div>Page not found.. Error 404!</div>} path='*'/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

//export default App;