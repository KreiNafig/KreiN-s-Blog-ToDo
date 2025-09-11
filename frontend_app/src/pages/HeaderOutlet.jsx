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
        <main style={{width: "83vw", margin: "0 auto"}}>
          <Outlet />
        </main>
    </div>
  )
}

export default Home