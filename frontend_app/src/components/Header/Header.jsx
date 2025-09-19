import React from 'react'
import {Link} from "react-router-dom"
import { useAuthMeQuery, authApi } from '../../api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../api/authSlice'

export const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authSlice.token);
  const { data } = useAuthMeQuery(token, { skip: !token });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    window.location.reload();
  };

  return (
    <header className="header__head">
      <h2><Link to="/" className="Link titleSite">KreiN'S TPA</Link></h2>
      <nav>
        <ul>
          <li><Link to="/todo" className="Link">ToDo List</Link></li>
          <li><Link to="/posts" className="Link">Posts</Link></li>
          {data !== undefined
            ?
            <div style={{display: "flex", gap: "25px", paddingRight: "25px"}}>
            <li><Link to="/profile" className="Link">{data?.username}</Link></li>
            <li style={{cursor: "pointer"}} onClick={() => handleLogout()}>Logout</li>
            </div>
            :
            <div style={{display: "flex", gap: "25px", paddingRight: "25px"}}>
            <li><Link to="/login" className="Link">Login</Link></li>
            <li><Link to="/register" className="Link">Register</Link></li>
            </div>
          }
        </ul>
      </nav>
    </header>
  )
}
