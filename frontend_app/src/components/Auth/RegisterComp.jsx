import React, {useState, useEffect} from 'react'
import { useValidation } from '../../hooks/useValidation'
import { useRegisterUserMutation } from '../../api/authApi'
import { useNavigate } from 'react-router';

import { saveToken } from '../../features/storage/localStorage';
import { useFormSubmit } from '../../hooks/useFormSubmit';

export const RegisteComp = () => {
  const [registerUser, {data, error}] = useRegisterUserMutation()
  const navigate = useNavigate()
  const login = useValidation('')
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
      if (data?.message === 'User registered!') {
        saveToken(data.token)
        navigate('/');
      } else if (data?.message) {
        alert(data.message);
      }
    }, [data, navigate]);

  const handleSubmit = useFormSubmit(() => email.errorMessage || password.errorMessage || login.errorMessage, () => {
    const obj = {
      username: login.value,
      email: email.value,
      password: password.value,
    }
    registerUser(obj)
    navigate('/')
  })


  return (
    <>
    <div className="auth">
      <div className="auth-card">
        <h2>Register</h2>
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)} noValidate>
          <div className="block__auth">
            <label htmlFor="login">Login</label>
            <input className="auth-input" type="text" id="login" name="login" value={login.value} onBlur={login.onBlur} onChange={login.onChange} />
            {(login.dirty && login.error) && <div style={{color: 'red'}}>{login.errorMessage}</div>}
          </div>
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
