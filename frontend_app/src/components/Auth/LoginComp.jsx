import React, {useEffect, useState} from 'react'
import { useAuthUserMutation } from '../../api/authApi'
import { useValidation } from '../../hooks/useValidation'
import {useNavigate} from 'react-router-dom'

import { saveToken } from '../../features/storage/localStorage'
import { useFormSubmit } from '../../hooks/useFormSubmit'

export const LoginComp = () => {
  const [loginUser, {data, error}] = useAuthUserMutation()
  const navigate = useNavigate()
    const email = useValidation('')
    const password = useValidation('')
    const [validation, setValidation] = useState(true)

    useEffect(() => {
      if(!email.errorMessage && !password.errorMessage) {
        setValidation(false)
      } else {
        setValidation(true)
      }
    }, [password.errorMessage, email.errorMessage])

     useEffect(() => {
    if (error?.data?.error) {
      alert(error.data.error);
    }
  }, [error]);

  useEffect(() => {
    if (data?.message === 'Login successful') {
      saveToken(data.token);
      navigate('/');
    } else if (data?.message) {
      alert(data.message);
    }
  }, [data, navigate]);
    
  const handleSubmit = useFormSubmit(() => email.errorMessage || password.errorMessage, () => {
    const obj = {
        email: email.value,
        password: password.value,
      }
      loginUser(obj)
  })


  return (
    <>
    <div className="auth">
      <div className="auth-card">
        <h2>Auth</h2>
        <form className="auth-form" onSubmit={(e) => {handleSubmit(e)}}>
          <div className="block__auth">
          <label htmlFor="email__auth">Email</label>
          <input className="auth-input" type="email" id="email__auth" name="email" value={email.value} onBlur={email.onBlur} onChange={email.onChange} />
          {(email.dirty && email.error) && <div style={{color: 'red'}}>{email.errorMessage}</div>}
          </div>
          <div className="block__auth">
          <label htmlFor="password__auth">Password</label>
          <input className="auth-input" type="password" id="password__auth" name="password" value={password.value} onBlur={password.onBlur} onChange={password.onChange} />
          {(password.dirty && password.error) && <div style={{color: 'red'}}>{password.errorMessage}</div>}
          </div>
          <button className="auth-button" disabled={validation} type="submit">Submit</button>
        </form>
       </div>
      </div>
    </>
  )
}
