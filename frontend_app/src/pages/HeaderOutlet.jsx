import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'


const Home = () => {
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