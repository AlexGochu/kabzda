import React from 'react';
import userPhoto from '../../assets/images/icons-user.png';
import styles from './users.module.css';
import {NavLink} from 'react-router-dom';

const User = ({user: {id, photos, followed, name, status}, followingInProgress, unfollow, follow}) => {

  return (<div>
          <span>
            <div>
              <NavLink to={`/profile/${id}`}>
                <img src={photos.small ? photos.small : userPhoto} className={styles.userPhoto} alt=""/>
              </NavLink>
            </div>
            <div>
              {
                followed
                  ? <button disabled={followingInProgress.some(userId => userId === id)} onClick={() => { unfollow(id); }}>UnFollow</button>
                  : <button disabled={followingInProgress.some(userId => userId === id)} onClick={() => { follow(id); }}>Follow</button>
              }
            </div>
          </span>
          <span>
            <span>
              <div>{name}</div>
              <div>{status}</div>
            </span>
              <span>
                <div>{'user.location.country'}</div>
                <div>{'user.location.city'}</div>
              </span>
          </span>
  </div>)
};

export default User;