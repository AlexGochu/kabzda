import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'; // BrowserRouter, HashRouter
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';
import {connect, Provider} from 'react-redux';
import {logout} from './redux/authReducer';
import {withRouter} from './hoc/withRouter';
import {compose} from 'redux';
import {initializeApp} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/reduxStore';
import {withSuspense} from './hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
// noinspection JSCheckFunctionSignatures
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

// import ProfileComponent from './components/Profile/ProfileContainer';
// noinspection JSCheckFunctionSignatures
const ProfileComponent = React.lazy(() => import('./components/Profile/ProfileContainer'));


// import UsersContainer from './components/Users/UsersContainer';
// noinspection JSCheckFunctionSignatures
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

//import LoginPage from './components/Login/Login';
// noinspection JSCheckFunctionSignatures
const LoginPage = React.lazy(() => import('./components/Login/Login'));


class App extends React.Component {
  catchAllUnhandledErrors =(promiseRejectionEvent) =>{
    alert("Error occured:" +promiseRejectionEvent);
    //console.log(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>;
    }

    const DialogApp = withSuspense(DialogsContainer);
    const ProfileApp = withSuspense(ProfileComponent);
    const UsersApp = withSuspense(UsersContainer);
    const LoginApp = withSuspense(LoginPage);


    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" element={<DialogApp/>}/>} />
            <Route path="/profile/*" element={<ProfileApp/>}/>
            <Route path="/users" element={<UsersApp/>}/>
            <Route path="/login" element={<LoginApp/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/" element={<Navigate to="/profile"/>}/>
            <Route path="*" element={<div>404 NOT FOUND</div>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});
const mapDispatchToProps = {
  logout,
  initializeApp
};
// export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);

const AppContainer = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
//basename={process.env.PUBLIC_URL}
const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>;
};

export default SamuraiJSApp;