import {Navigate} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export const withAuthRedirectComponent = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to={'/login'}/>;
      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, null)(RedirectComponent);

};