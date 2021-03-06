import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile} from '../../redux/profileReducer';
import {withRouter} from '../../hoc/withRouter';
import {compose} from 'redux';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirect';

class ProfileComponent extends React.Component {
  refreshProfile = () => {
    const userId = this.props.router.params['*'] || this.props.authorizedUserId;
    if (!userId) {
      this.props.router.navigate('/login', {replace: true});
      //return <Navigate to={'/login'}/>;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  };

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.router.params['*'] !== prevProps.router.params['*']) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile {...this.props} isOwner={!this.props.router.params['*'] || this.props.router.params['*'] === this.props.authorizedUserId.toString() }/>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile
};
//
export default compose(withAuthRedirectComponent, withRouter, connect(mapStateToProps, mapDispatchToProps))(ProfileComponent);
