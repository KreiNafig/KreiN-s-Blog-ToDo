import React, {useState, useEffect} from 'react'
import "./auth.css"
import { useValidation } from '../../hooks/useValidation'
import { useRegisterUserMutation } from '../../api/authApi'

export const RegisteComp = () => {
  const [registerUser, {error}] = useRegisterUserMutation()
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
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(email.errorMessage || password.errorMessage) {
        alert('Ошибка в форме')
        return
      }
    const obj = {
      username: login.value,
      email: email.value,
      password: password.value,
    }
    registerUser(obj)
  }
  return (
    <>
    <div className="auth">
      <div className="container__auth">
        <h2>Register</h2>
        <form onSubmit={(e) => handleSubmit(e)} noValidate>
          <div className="block__auth">
            <label htmlFor="login">Login</label>
            <input type="text" id="login" name="login" value={login.value} onBlur={login.onBlur} onChange={login.onChange} />
            {(login.dirty && login.error) && <div style={{color: 'red'}}>{login.errorMessage}</div>}
          </div>
          <div className="block__auth">
          <label htmlFor="email__auth">Email</label>
          <input type="email" id="email__auth" name="email" value={email.value} onBlur={email.onBlur} onChange={email.onChange} />
          {(email.dirty && email.error) && <div style={{color: 'red'}}>{email.errorMessage}</div>}
          </div>
          <div className="block__auth">
          <label htmlFor="password__auth">Password</label>
          <input type="password" id="password__auth" name="password" value={password.value} onBlur={password.onBlur} onChange={password.onChange} />
          {(password.dirty && password.error) && <div style={{color: 'red'}}>{password.errorMessage}</div>}
          </div>
          <button disabled={validation} type="submit">Submit</button>
        </form>
       </div>
      </div>
    </>
  )
}
