import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from '../axios';

export const FullPost = () => {
  const {id} = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setIsLoading(false);
    }).catch(err => {
        console.log(err);
        alert("Ошибка при загрузке поста")
      });  
  }, []);

  if(isLoading) {
    return <Post isLoading={true}/>
  }

  const comments = data.comments.map(obj => {
    return {
            user: {
              fullName: obj.user.fullName? obj.user.fullName : 'Вася Пупкин',
              avatarUrl: obj.user.avatar? obj.user.avatar : "https://mui.com/static/images/avatar/1.jpg",
            },
            text: obj.text,
          }
  });
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={`http://localhost:3001${data.imageURL}`}
        user={{
          avatarUrl:
            data.user.avatarURL,
          fullName: data.user.fullName,
        }}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPos
      >
        <Markdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={false}
      >
        <Index id = {data._id}/>
      </CommentsBlock>
    </>
  );
};
