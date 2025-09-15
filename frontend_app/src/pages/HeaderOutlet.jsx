import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useGetPostsQuery } from '../api/postApi'


const Home = () => {
  const {data} = useGetPostsQuery()
  console.log(data)
  return (
    <div>
        <Header />
        <main className="container">
          <Outlet />
        </main>
    </div>
  )
}

export default Home