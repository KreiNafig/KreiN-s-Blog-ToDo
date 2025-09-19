import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetUserProfileQuery } from '../../api/profileApi';

export const UserComp = () => {
  const { id } = useParams();
  const {data, error} = useGetUserProfileQuery(id)
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(data)
  }, [data]);
  console.log(error)
  if (error?.status === 404) return (
  <div className="error-page">
    <h1>Возникла ошибка!</h1>
    <p>Пользователь не найден</p>
  </div>);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h2>{user?.username}</h2>
            <img 
              src={user?.avatar?.startsWith('/upload') ? `http://localhost:4000${user?.avatar}` 
              : "https://i.pinimg.com/736x/8b/26/40/8b264036d4817515a2d60043f3ae9643.jpg"} 
              alt="avatar"
            />
            <div className="bio">
            <div style={{margin: "5px 0px"}}>Описание:</div>
              {user?.bio === null
                ? "У пользователя отсутствует описание"
                : user?.bio}
            </div>
        <p className="email">Почта: {user?.email}</p>
      </div>
      <div className="profile-posts">
        <h2>Посты пользователя:</h2>
        {user?.posts?.length === 0 ? <div className="post-card">У пользователя нет постов</div> : user?.posts?.map((e) => (
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
    
  );
}

export default UserComp;