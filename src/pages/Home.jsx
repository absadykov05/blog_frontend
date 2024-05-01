import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchTags, sortPosts } from '../redux/slices/posts';

export const Home = () => {
  const {posts, tags} = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const data = useSelector(state => state);

  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState(0);

  const isPostLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  
  const sortPosts1 = () => {
    dispatch(sortPosts());
    setIsSorted(1);
  }

  const sortPosts2 = () => {
    dispatch(fetchPosts());
    setIsSorted(0);
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={isSorted} aria-label="basic tabs example">
        <Tab onClick = {sortPosts2} label="Новые"/>
        <Tab onClick = {sortPosts1} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ? (
            <Post isLoading={true} key = {index}/>
          ) : (
            <Post
              id = {obj._id}
              title = {obj.title}
              imageUrl = {`http://localhost:3001${obj.imageURL}`}
              user = {{
                avatarUrl:
                  `${obj.user.avatarURL}`,
                fullName: `${obj.user.fullName}`,
              }}
              createdAt = {obj.createdAt}
              viewsCount = {obj.viewsCount}
              commentsCount = {3}
              tags = {obj.tags}
              isEditable = {userData?.email === obj.user.email}
              isLoading = {false}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading}/>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
