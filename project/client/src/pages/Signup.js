import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import config from '../config.json'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
  
    const createUser = async () => {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(`http://${config.server_host}:${config.server_port}/account/signup`, { "username": username, "password": password })
      if (data === 'user created successfully') {
        history.push('/')
      } else {
        alert(`ERROR: ${data}`)
      }
    }

    return (
      <>
        <h1>Sign Up</h1>  
        <h4><Link to="/"> Home</Link></h4>
        Username: <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br />
        <Button onClick={createUser}> Sign Up </Button>
        <nav>
          <Link to="/login"> Already have an account? Log In Here!</Link>
        </nav>
      </>
    )
  }