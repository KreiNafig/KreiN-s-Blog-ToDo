import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useCreateCommentPostMutation, useDeleteCommentPostMutation, useGetPostQuery, useUpdateCommentPostMutation } from '../../api/postApi'
import { useAuthMeQuery } from '../../api/authApi'
import { useValidation } from '../../hooks/useValidation'
import { Link } from 'react-router-dom'

export const PostComp = () => {
  const {id: num} = useParams()
  const {data: authMe} = useAuthMeQuery()
  const {data} = useGetPostQuery(num)
  const [createComment] = useCreateCommentPostMutation()
  const [updateComment] = useUpdateCommentPostMutation()
  const [deleteComment] = useDeleteCommentPostMutation()
  const comment = useValidation('')
  const commentUpdate = useValidation('')
  const [validation, setValidation] = useState(true)
  const [updateCommentUser, setUpdateCommentUser] = useState(null)

  useEffect(() => {
            if(!comment.errorMessage) {
              setValidation(false)
            } else {
              setValidation(true)
            }
          }, [comment.errorMessage])

  function deleteCommentPost(commentId) {
    const obj = {
      numPost: data.id,
      commentId,
    }
    deleteComment(obj)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const numPost = data.id
    if(comment.errorMessage) {
          alert('Ошибка в форме')
          return
        }
    
    const obj = {
      text: comment.value,
      userId: authMe.id,
    }

    const argComment = {
      numPost,
      obj
    }
    createComment(argComment)
    comment.reset()
  }
  function updatesCommentUser(e, id) {
    e.preventDefault()
    if(commentUpdate.errorMessage) {
          alert('Ошибка в форме')
          return
        }
    const obj = {
      content: commentUpdate.value,
      numPost: data.id,
      commentId: id,
    }
    
    updateComment(obj)
    setUpdateCommentUser(null)
  }
  return (
    <>
    <div className="card">
      <h1>{data?.title}</h1>
      <div>{data?.author}</div>
      <data className="date">{data?.createdAt}</data>
      <p>{data?.content}</p>
    </div>
    {data?.author === authMe?.username ? <Link to={`/posts/${data?.id}/update`} ><button>Редактировать пост</button></Link> : <></>}
    <form className="comment-form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="comment">Добавить комментарий:</label>
      <input name='comment' id='comment' value={comment.value} onChange={comment.onChange} onBlur={comment.onBlur}/>
      {(comment.dirty && comment.error) && <div style={{color: 'red'}}>{comment.errorMessage}</div>}
      <button disabled={validation} type="submit">Отправить</button>
    </form>
    <br />
    <div className="comments-block">
      <h4>Комментарии</h4>
      {data?.comments?.map((e) => (
        <div className="comment" key={e.id}>
            <h2 className="author">{e.author}</h2>
            <date className="date">{e.createdAt}</date>
                {updateCommentUser === e.id 
                ? <form onSubmit={(event) => updatesCommentUser(event, e.id)}>
                   <input name='commentUpdate'value={commentUpdate.value} onChange={commentUpdate.onChange} onBlur={commentUpdate.onBlur}/>
                  {(commentUpdate.dirty && commentUpdate.error) && <div style={{color: 'red'}}>{commentUpdate.errorMessage}</div>}
                  <button>Сохранить</button>
                </form>
                : <>
                    <p className="text">{e.text}</p>
                    <button onClick={() => setUpdateCommentUser(e.id)}>Изменить комментарий</button>
                  </>
                }
            <button onClick={() => deleteCommentPost(e.id)}>Удалить комментарий</button>
        </div>))}
    </div>
    </>
  )
}
