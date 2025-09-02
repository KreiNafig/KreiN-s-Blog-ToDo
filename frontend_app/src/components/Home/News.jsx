import React from 'react'
import "./home.css"

export const News = () => {
    const date = new Date()
  return (
     <>
        <section className="news">
            <header><h1>Новости сайта:</h1></header>
            <section>
                <article>
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article>
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
                <article>
                    <h3>*****</h3>
                    <p>*****</p>
                    <p>{date.getFullYear()} год</p>
                </article>
            </section>
        </section>
    </>
  )
}
