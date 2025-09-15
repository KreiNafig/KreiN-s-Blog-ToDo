import React from 'react'
import "./posts.css"
import { useDeletePostMutation, useGetPostsQuery } from '../../api/postApi'
import { Link } from 'react-router-dom'
import { useAuthMeQuery } from '../../api/authApi'

export const PostsComp = () => {
    const {data} = useGetPostsQuery()
    const {data: user} = useAuthMeQuery()
    const [deletePost] = useDeletePostMutation()
    console.log(data)
  return (
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
    <div style={{display: "flex", flexDirection: "column"}}>
    {data?.map((e) => (
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
      <Link to="/posts/create"><button>Добавить пост</button></Link>
    </div>
    </div>
  )
}
