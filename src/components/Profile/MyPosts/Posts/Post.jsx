import React from 'react';
import classes from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img
                src="https://avatarfiles.alphacoders.com/894/thumb-89421.jpg"
                alt=""
            />
            {props.message}
            <div>{`Liked: ${props.likeCount} time(s)`}</div>
            <div>
                <span>like</span>
            </div>
        </div>
    );
};

export default Post;
