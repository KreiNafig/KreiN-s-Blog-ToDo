import React from 'react'
import "./home.css"

export const News = () => {
    const date = new Date()
  return (
     <>
        <section>
            <header><h1 style={{color: "white"}}>Новости сайта:</h1></header>
            <section className="news-grid">
                <article className="news-card">
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article className="news-card">
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article className="news-card">
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
            </section>
        </section>
    </>
  )
}
