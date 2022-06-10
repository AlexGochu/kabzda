import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/icons-user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateUserStatus}) => {
  if (!profile) return <Preloader/>;


  return (
    <div>

      <div className={classes.descriptionBlock}>
        <img src={`${profile.photos.large ? profile.photos.large : userPhoto}`} className={classes.image} alt=""/>
        <ProfileStatusWithHooks statusProps={status} updateUserStatus={updateUserStatus}/>
        {`${profile.fullName ? profile.fullName : ''}`}
        {`${profile.aboutMe ? profile.aboutMe : ''}`}
      </div>
    </div>
  );
};
export default ProfileInfo;