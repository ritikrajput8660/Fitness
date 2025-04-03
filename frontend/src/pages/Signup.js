import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signup, isLoading, error } = useSignup()

  const handleClick = async (e) => {
    await signup(username, password)
  }

  return (
    <div className='container'>
      <form className='signup'>
        <h1>Register a new account</h1>

        <div className='form-group'>
          
          <input 
            id='username'
            placeholder='Username'
            type="text"
            onChange={ (e) => setUsername(e.target.value)}
            value={username}
            autoComplete="off"
            autoFocus="on"
          />
        </div>



        {/* this is email input filed */}
        
        <div className='form-group'>
          {/* <label htmlFor='email'>Email: </label> */}
          <input 
            id='email'
            type="email"
            placeholder='Email'
            onChange={ (e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
        </div>


        <div className='form-group'>
          {/* <label htmlFor='password'>Password: </label> */}
          <input 
            id='password'
            placeholder='Password'
            type="password"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />
        </div>

        <button onClick={handleClick} disabled={isLoading}>Sign Up</button>
        { error && <div className='error'>{ error }</div> }
      </form>
    </div>
  )
}