import React from 'react';
import classes from './FormControls.module.css';
import {Field} from 'redux-form';


const FormControl = ({meta: {error, touched}, children}) => {
  const hasError = error && touched;
  return (
    <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
      <div>{children}</div>
      <div>
        {hasError && <span>{error}</span>}
      </div>
    </div>
  );
};

export const TextArea = (props) => {
  const {input, meta, child, ...rest} = props;
  return (
    <FormControl {...props}><textarea {...input} {...rest} /></FormControl>
  );
};

export const Input = (props) => {
  const {input, meta, child, ...rest} = props;
  return (
    <FormControl {...props}><input {...input} {...rest} /></FormControl>
  );
};
export const createField = (placeholder, name, component, validators, props, text="") => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      component={component}
      validate={validators}
      {...props}
    />{text}
  </div>);