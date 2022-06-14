import React from 'react';
import {createField, Input, TextArea} from '../../common/FormControls/FormControls';
import {reduxForm} from 'redux-form';
import classes from './ProfileInfo.module.css';

const ProfileDataForm = ({handleSubmit, profile, error}) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={classes.formSummaryError}>
        {error}
      </div>}
      <div>
        <b>Full name:</b> {createField('Full name', 'fullName', Input, [])}
      </div>
      <div>
        <b>Looking for a job:</b> {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
      </div>
      <div>
        <b>My professional skills:</b> {createField('Professional skills', 'lookingForAJobDescription', TextArea, [])}
      </div>
      <div>
        <b>About me:</b> {createField('About me...', 'aboutMe', TextArea, [])}
      </div>
      <div>
        <b>Contacts:</b> {
        Object.keys(profile.contacts).map((key, index) => (
          <div className={classes.contact} key={index} contactTitle={key} contactValue={profile.contacts[key]}>
            <b>{key}:</b> {createField(key, `contacts.${key}`, Input)}
          </div>
        ))
      }
      </div>
    </form>
  );
};
const ProfileDataReduxForm = reduxForm({form: 'editProfile', enableReinitialize: true})(ProfileDataForm);


export default ProfileDataReduxForm;