import React from "react";
import classes from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = ({name, id}) => {
    const path = `/dialogs/${id}`
    return (
        <div className={classes.dialog + ' ' + classes.active}><NavLink to={path}>{name}</NavLink></div>
    )
}

export default DialogItem;