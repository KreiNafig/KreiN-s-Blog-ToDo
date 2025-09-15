import React, { useRef, useState } from 'react'
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/profileApi'
import { useAuthMeQuery } from '../../api/authApi'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'
import './profile.css'

export const ProfileComp = () => {
    const {data: user} = useAuthMeQuery()
    const {data} = useGetProfileQuery(user?.id)
    const [updateProfile] = useUpdateProfileMutation()
    const file = useRef(null)
    const text = useValidation()
    const [asd, setAsd] = useState(false)
    console.log(data)
    function handleSubmit(e) {
        e.preventDefault()

        const obj = {
            bio: text.value || null,
            avatar: file.current.files[0] || null,
        }

        updateProfile(obj)
    }
    console.log(file)
  return (
    <div className="profile-container">
  <div className="profile-sidebar">
    <h2>{data?.username}</h2>
    {asd ? (
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
        {data?.avatar === null ? (
          "Picture is not"
        ) : (
          <img src={`http://localhost:4000${data?.avatar}`} alt="avatar" />
        )}
        <p className="bio">
          {data?.bio === null
            ? "У пользователя отсутствует описание"
            : data?.bio}
        </p>
        <p className="email">Почта: {data?.email}</p>
      </>
    )}
  </div>
  <div className="profile-posts">
    <h2>Посты пользователя:</h2>
    {data?.posts.map((e) => (
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
