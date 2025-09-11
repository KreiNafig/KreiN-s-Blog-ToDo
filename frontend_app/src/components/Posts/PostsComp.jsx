import React from 'react'
import "./posts.css"
import { useGetPostsQuery } from '../../api/postApi'
import { Link } from 'react-router-dom'

export const PostsComp = () => {
    // const {data} = useGetPostsQuery()
    const data = [{
      id: 1,
      title: 'hello',
      description: 'dsf',
      author: 'krein',
      comments: [],
      data: Date.now()
    }]
  return (
    <div style={{display: "flex"}}>
    {data?.map((e) => (
        <Link to={`${e.id}`} style={{color: "white"}}><article className="post" key={e.id}>
            <h2>{e.title}</h2>
            <p>{e.description}</p>
            <div>Автор: {e.author}</div>
            <div>{e.comments.length} комментариев</div>
            <data>{e.data} ms</data>
        </article></Link>
    ))}
    <div style={{marginTop: "20px"}}>
      <Link to="/"><button>Добавить пост</button></Link>
    </div>
    </div>
  )
}
