import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Navigate} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {TextArea} from '../common/FormControls/FormControls';
import {maxLengthCreator, required} from '../../utils/validators/validators';

const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="messageBody"
          placeholder="Enter you message"
          component={TextArea}
          validate={[required, maxLength100]}
        ></Field>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({form: 'dialogMessageForm'})(AddMessageForm);

const Dialogs = (props) => {
  // const {dialogPage: {dialogs, messages}, sendMessage, updateNewMessageBody} = props;
  const {dialogPage: {dialogs, messages}, sendMessage} = props;
  const dialogsElements = dialogs.map(dialog => (
    <DialogItem key={dialog.id} id={dialog.id} name={dialog.name}/>));

  const messagesElements = messages.map(msg => (<Message key={msg.id} message={msg.message}/>));

  const addNewMessage = (values) => {
    sendMessage(values.messageBody);
  };
  if (props.isAuth === false) {
    return <Navigate to={'/login'}/>;
  }
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>);
};
export default Dialogs;