import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import config from '../config.json'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
  
    const loginUser = async () => {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(`http://${config.server_host}:${config.server_port}/account/login`, { "username": username, "password": password })
      if (data === 'user logged in successfully') {
        history.push('/')
      } else {
        alert(`ERROR: ${data}`)
      }
    }

    return (
      <>
        <h1>Login</h1>
        <h4><Link to="/"> Home</Link></h4>
        Username: <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br />
        <Button onClick={loginUser}> Login </Button>
        <nav>
          <Link to="/signup"> Don't have an account yet? Sign up now!</Link>
        </nav>
      </>
    )
}
