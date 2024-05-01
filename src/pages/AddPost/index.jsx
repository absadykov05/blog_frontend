import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';


export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const data = useSelector(state => state.posts.posts.items);
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const {id} = useParams();
  const inputFileRef = React.useRef(null);
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const editPost = async () => {
      const currentData = await data.find(obj => obj._id === id);
      setTitle(currentData.title);
      setImageURL(currentData.imageURL);
      setTags(currentData.tags);
      setText(currentData.text);
  }
  useEffect(() => {
    if(id) {
      editPost();
    }  
  }, [])

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageURL(data.url)
    } catch(err) {
      console.log(err);
      alert('Ошибка при загрузке файлов');
    }
  };

  const onClickRemoveImage = () => {
    setImageURL('');
  };

  const onChange = React.useCallback((value) => {
    setText(value)
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmit = async () => {
    try { 
      const fields = {
        title, 
        text,
        tags,
        imageURL: imageURL,
      };

      const {data} = isEditing 
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      
      const newId = isEditing ? id : data._id;
      navigate(`/posts/${newId}`);   
    } catch (err) {
        console.log(err);
        alert('Не удалось опубликовать статью 2')
    }
  }

  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to = '/'/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref = {inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageURL && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
        <img className={styles.image} src={`http://localhost:3001${imageURL}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value = {title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth value = {tags} onChange = {e => setTags(e.target.value)}/>
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" type = "submit" onClick={onSubmit}>
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
