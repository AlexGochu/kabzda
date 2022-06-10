import {connect} from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {follow, requestUsers, setCurrentPage, unfollow} from '../../redux/usersReducer';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSuperSelector} from '../../redux/usersSelectors';

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize, requestUsers} = this.props;
    requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };


  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />

    </>;
  }
}

const mapStateToProps = (state) => ({
  users: getUsersSuperSelector(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state)
});
const mapDispatchToProps = {
  follow,
  unfollow,
  setCurrentPage,
  requestUsers
};

export default compose(withAuthRedirectComponent, connect(mapStateToProps, mapDispatchToProps))(UsersContainer);