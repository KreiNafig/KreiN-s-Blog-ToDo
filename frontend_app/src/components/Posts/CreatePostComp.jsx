import React, {useEffect, useState} from 'react'
import { useCreatePostMutation } from '../../api/postApi'
import { useAuthMeQuery } from '../../api/authApi'
import { useNavigate } from 'react-router'
import { useValidation } from '../../hooks/useValidation'
import { useFormSubmit } from '../../hooks/useFormSubmit'

export const CreatePostComp = () => {
    const {data} = useAuthMeQuery()
    const [createPost] = useCreatePostMutation()
    const title = useValidation('')
    const text = useValidation('')
    const navigate = useNavigate()
    const [validation, setValidation] = useState(true)
    
    useEffect(() => {
          if(!title.errorMessage && !text.errorMessage) {
            setValidation(false)
          } else {
            setValidation(true)
          }
        }, [title.errorMessage, text.errorMessage])


        const handleSubmit = useFormSubmit(() => title.errorMessage || text.errorMessage, () => {
            const dataPost = {
            title: title.value,
            content: text.value,
            authorId: data?.id,
        }
        createPost(dataPost)
        navigate('/posts')
        })

  return (
    <div className="create-post">
        <h1>Создание поста:</h1>
        <form onSubmit={(e) => handleSubmit(e)} noValidate>
            <div>
            <label htmlFor="title">Заголовок</label>
            <input name="title" id="title" value={title.value} onChange={title.onChange} onBlur={title.onBlur} />
            {(title.dirty && title.error) && <div style={{color: 'red'}}>{title.errorMessage}</div>}
            </div>
            <div>
                <label htmlFor="text">Текст</label>
                <input name="text" id="text" value={text.value} onChange={text.onChange} onBlur={text.onBlur} />
                {(text.dirty && text.error) && <div style={{color: 'red'}}>{text.errorMessage}</div>}
            </div>
            <button disabled={validation} type="submit">Отправить</button>
        </form>
    </div>
  )
}
