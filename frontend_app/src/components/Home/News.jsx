import React from 'react'
import { useGetUsersQuery } from '../../api/usersApi'
import { Link } from 'react-router'

export const News = () => {
    const date = new Date()
    const {data: users} = useGetUsersQuery()
    console.log(users)
  return (
     <>
        <header><h1 style={{color: "white"}}>Новости сайта:</h1></header>
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <section>
            <section className="news-grid">
                <article className="news-card">
                    <h3>Стилизация сайта</h3>
                    <p>Доработка стилей всего сайта</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article className="news-card">
                    <h3>Добавление доп.функционала</h3>
                    <p>Добавление логики сортировки туду-задач/постов, поиска</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article className="news-card">
                    <h3>Доработка Backend'а</h3>
                    <p>Доработка запроса рандомных пользователей</p>
                    <p>{date.getFullYear()} год</p>
                </article>
            </section>
        </section>
        <div className="sidebar">
        <h3>Пользователи</h3>
        {users?.map((u) => (
            <div key={u.id} className="user-mini">
            <Link to={`/profile/${u.id}`}>
                <img 
                    src={
                        u.avatar.startsWith('/upload')
                        ? `http://localhost:4000${u.avatar}` 
                        : "https://i.pinimg.com/736x/8b/26/40/8b264036d4817515a2d60043f3ae9643.jpg"
                    } 
                    alt={u.username} 
                />
                <span>{u.username}</span>
            </Link>
            </div>
        ))}
            </div>
            </div>
    </>
  )
}
