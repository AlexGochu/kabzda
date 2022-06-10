import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Posts/Post';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {TextArea} from '../../common/FormControls/FormControls';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={TextArea}
          name="newPost"
          placeholder="Post..."
          validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({form: 'postsForm'})(AddNewPostForm);

const MyPosts = (props) => {
  const postsElement = props.posts.map(post => <Post key={post.id}
                                                     message={post.message}
                                                     likeCount={post.likeCount}/>);

  const onAddNewPost = (values) => {
    props.addPost(values.newPost);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddNewPost}/>
      <div className={classes.posts}>
        {postsElement}
      </div>
    </div>
  );
};
export default React.memo(MyPosts);
