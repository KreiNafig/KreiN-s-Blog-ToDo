import React from 'react'
import "./header.css"
import {Link} from "react-router-dom"
import { useAuthMeQuery } from '../../api/authApi'

export const Header = () => {
  const {data} = useAuthMeQuery(localStorage.getItem('token'))
  console.log(data)
  return (
    <header className="header__head">
      <h2><Link to="/" className="Link">KreiN'S TPA</Link></h2>
      <nav>
        <ul>
          <li><Link to="/todo" className="Link">ToDo List</Link></li>
          <li><Link to="/posts" className="Link">Posts</Link></li>
          <li><Link to="/login" className="Link">Login</Link></li>
          <li><Link to="/register" className="Link">Register</Link></li>
        </ul>
      </nav>
    </header>
  )
}
