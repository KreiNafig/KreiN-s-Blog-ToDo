import React, { useRef, useState } from 'react'
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profileApi'
import { useAuthMeQuery } from '../../api/authApi'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'

export const ProfileComp = () => {
    const {data: user} = useAuthMeQuery()
    const {data} = useGetProfileQuery(user?.id)
    const [updateProfile] = useUpdateProfileMutation()
    const file = useRef(null)
    const text = useValidation()
    const [edit, setEdit] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const obj = {
            bio: text.value || null,
            avatar: file.current.files[0] || null,
        }
        updateProfile(obj)
        setEdit(false)
    }

  return (
    <div className="profile-container">
  <div className="profile-sidebar">
    <h2>{data?.username}</h2>
    {edit ? (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="avatar">Изменить аватар</label>
          <input ref={file} id="avatar" type="file" />
        </div>
        <div>
          <label htmlFor="bio">Изменить биографию</label>
          <input
            id="bio"
            type="text"
            name="text"
            onChange={text.onChange}
            onBlur={text.onBlur}
            value={text.value}
          />
          {text.dirty && text.error && (
            <div style={{ color: "red" }}>{text.errorMessage}</div>
          )}
        </div>
        <button type="submit">Сохранить</button>
      </form>
    ) : (
      <>
        <img 
          src={data?.avatar.startsWith('/upload') ? `http://localhost:4000${data.avatar}` 
          : "https://i.pinimg.com/736x/8b/26/40/8b264036d4817515a2d60043f3ae9643.jpg"} 
          alt="avatar"
        />
        <div className="bio">
          <div style={{margin: "5px 0px"}}>Описание:</div>
          {data?.bio === null
            ? "У пользователя отсутствует описание"
            : data?.bio}
        </div>
        <button style={{margin: "20px 0px"}} onClick={() => setEdit(true)}>Редактировать профиль</button>
      </>
    )}
    <p className="email">Почта: {data?.email}</p>
  </div>
  <div className="profile-posts">
    <h2>Посты пользователя:</h2>
    {data?.posts?.length === 0 ? <div className="post-card">У пользователя нет постов</div> :data?.posts.map((e) => (
      <article className="post-card" key={e.id}>
        <Link to={`/posts/${e.id}`} style={{ color: "black" }}>
          <h2 className="title">{e.title}</h2>
        </Link>
        <p>{e.content}</p>
        <data>{e.createdAt}</data>
      </article>
    ))}
  </div>
</div>

  )
}
