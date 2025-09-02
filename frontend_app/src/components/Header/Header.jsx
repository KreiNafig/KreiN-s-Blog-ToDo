import React from 'react'
import "./header.css"
import {Link} from "react-router-dom"

export const Header = () => {
  return (
    <header className="header__head">
      <h2><Link to="/" className="Link">KreiN'S TPA</Link></h2>
      <nav>
        <ul>
          <li>ToDo List</li>
          <li>Posts</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
    </header>
  )
}
