import React from 'react';

import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProgress, unfollow, follow}) => {

  return (
    <div>
      <Paginator
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}/>
      {
        users.map(user => (
          <User key={user.id}
                user={user}
                followingInProgress={followingInProgress}
                unfollow={unfollow}
                follow={follow}/>))
      }
    </div>
  );
};

export default Users;