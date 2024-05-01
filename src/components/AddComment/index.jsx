import React, { useEffect, useState } from "react";

import styles from "./AddComment.module.scss";
import axios from '../../axios'
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export const Index = (id) => {
  const [text, setText] = useState('');
  const userData = useSelector(state => state.auth.data);
  console.log(userData);

  const addComments = async (comment) => {
    const commentId = id.id;
    const params = {
      user: userData,
      text: comment,
    }
    await axios.patch(`/addComment/${id.id}`, params);
    setText('');
    window.location.reload();
  }


  
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick = {() => addComments(text)}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
