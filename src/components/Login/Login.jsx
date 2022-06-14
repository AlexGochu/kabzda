import React from 'react';
import {reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormControls/FormControls';
import {required} from '../../utils/validators/validators';
import {login} from '../../redux/authReducer';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import classes from '../common/FormControls/FormControls.module.css';

const LoginForm = ({handleSubmit, error,captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', Input, [required])}
      {createField('Password', 'password', Input, [required], {type: 'password'})}
      {createField('', 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}
      {captchaUrl && <img src={captchaUrl} alt="captchaUrl"/>}
      {captchaUrl && createField('Captcha Symbols', 'captcha', Input, [required])}
      {error && <div className={classes.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    if (props.isAuth && props.userId) {
      return <Navigate to={'/profile/' + props.userId}/>;
    }


    return (
      <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
      </div>
    );
  }
;
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
  captchaUrl: state.auth.captchaUrl
});
const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);