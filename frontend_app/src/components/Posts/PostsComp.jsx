import React, { useEffect, useState } from 'react'
import { useDeletePostMutation, useGetPostsQuery } from '../../api/postApi'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuthMeQuery } from '../../api/authApi'
import { sortPostAuthor, sortNewElement, sortOldElement, sortPostName } from '../../features/sort'

export const PostsComp = () => {
    const {data} = useGetPostsQuery()
    const {data: user} = useAuthMeQuery()
    const [deletePost] = useDeletePostMutation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [posts, setPosts] = useState([])
    const namePost = searchParams.get('name') || '';
    const authorPost = searchParams.get('author') || '';

    useEffect(() => {
      let filterPosts = data
        if(namePost !== '') filterPosts = sortPostName(filterPosts, namePost)
        if(authorPost !== '') filterPosts = sortPostAuthor(filterPosts, authorPost)
        setPosts(filterPosts)
    }, [data])

    useEffect(() => {
      if(namePost || authorPost) {
        let filterPosts = data
        if(namePost !== '') filterPosts = sortPostName(filterPosts, namePost)
        if(authorPost !== '') filterPosts = sortPostAuthor(filterPosts, authorPost)

          setPosts(filterPosts)
      } else {
        setPosts(data)
      }
    }, [namePost, authorPost])

    const updateSearchParam = (key, value) => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({
      ...currentParams,
      [key]: value
    });
  };

  return (
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
    <div style={{display: "flex", flexDirection: "column"}}>
    {(posts?.length > 0 ? posts : data)?.map((e) => (
        <article className="post-card" key={e.id}>
            <Link to={`/posts/${e.id}`} style={{color: "black"}}><h2 className="title">{e.title}</h2></Link>
            <p>{e.content}</p>
            <div style={{marginTop: "20px"}}>Автор: {e.author}</div>
            <div>{e.commentsCount} комментариев</div>
            <data className="date">{e.createdAt}</data>
            {e.author === user?.username ? <button onClick={() => deletePost(e.id)}>Удалить пост</button> : <></>}
        </article>
    ))}
    </div>
    <div className="sidebar">
      <h3>Добавить пост:</h3>
      <Link to="/posts/create"><button>Добавить</button></Link>
      <h3 style={{marginTop: "30px"}}>Сортировка:</h3>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <button onClick={() => setPosts(sortNewElement(posts))}>Новые</button>
      <button onClick={() => setPosts(sortOldElement(posts))}>Старые</button>
      </div>
      <h3 style={{marginTop: "30px"}}>Поиск поста:</h3>
      <h4>По названию:</h4>
      <input className="post-input" value={namePost} onChange={(e) => updateSearchParam('name', e.target.value)} />
      <h4>По автору:</h4>
      <input className="post-input" value={authorPost} onChange={(e) => updateSearchParam('author', e.target.value)} />
    </div>
    </div>
  )
}
