import React, {useEffect, useState} from 'react'
import { useValidation } from '../../hooks/useValidation'
import { useGetPostQuery, useUpdatePostMutation } from '../../api/postApi'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdatePostComp = () => {
    const {id: num} = useParams()
    const {data} = useGetPostQuery(num)
    const [updatePost] = useUpdatePostMutation()
    const navigate = useNavigate()
    const title = useValidation('')
    const text = useValidation('')
    const [validation, setValidation] = useState(true)

    useEffect(() => {
        if (data) {
            title.setValueForce(data.title)
            text.setValueForce(data.content)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    useEffect(() => {
          if(!title.errorMessage && !text.errorMessage) {
            setValidation(false)
          } else {
            setValidation(true)
          }
        }, [title.errorMessage, text.errorMessage])

    function handleSubmit(e) {
        e.preventDefault()
        if(title.errorMessage || text.errorMessage) {
          alert('Ошибка в форме')
          return
        }
    const obj = {
        title: title.value,
        content: text.value,
        id: num
    }

    updatePost(obj)
    navigate(-1)
    }
    

  return (
    <div className="create-post">
        <h1>Редакция поста</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input placeholder='Введите заголовок' name="title" value={title.value} onChange={title.onChange} onBlur={title.onBlur} />
            {(title.dirty && title.error) && <div style={{color: 'red'}}>{title.errorMessage}</div>}
            <input placeholder='Введите текст' name="text" value={text.value} onChange={text.onChange} onBlur={text.onBlur} />
            {(text.dirty && text.error) && <div style={{color: 'red'}}>{text.errorMessage}</div>}
            <button type="submit" disabled={validation}>Сохранить</button>
        </form>
    </div>
  )
}
