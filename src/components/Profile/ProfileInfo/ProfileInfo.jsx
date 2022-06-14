import React, {useState} from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/icons-user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataReduxForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
  const [editMode, setEditMode] = useState(false);
  if (!profile) return <Preloader/>;

  const mainPhotoSelectedOn = (e) => {
    if (e.target.files.length)
      savePhoto(e.target.files[0]);
  };
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };


  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img src={`${profile.photos.large ? profile.photos.large : userPhoto}`} className={classes.mainPhoto} alt=""/>
        {isOwner && <input type="file" onChange={mainPhotoSelectedOn}/>}
        {editMode
          ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} goToViewMode={() => {setEditMode(false);}}/>
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true);}}/>}
        <ProfileStatusWithHooks statusProps={status} updateUserStatus={updateUserStatus}/>
        {/*{`${profile.fullName ? profile.fullName : ''}`}*/}
        {/*{`${profile.aboutMe ? profile.aboutMe : ''}`}*/}
      </div>
    </div>
  );
};
const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return (
    <div>
      {isOwner && <div>
        <button onClick={goToEditMode}>Edit</button>
      </div>}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional skills: {profile.lookingForAJobDescription}</b>
        </div>
      }
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts:</b> {Object.keys(profile.contacts).map((key, index) => <Contact key={index} contactTitle={key} contactValue={profile.contacts[key]}/>)}
      </div>
    </div>
  );
};


export const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
export default ProfileInfo;