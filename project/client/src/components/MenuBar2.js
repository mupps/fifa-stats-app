import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";
import { getLoginStatus, signoutUser } from '../fetcher';

export default function MenuBar2() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const history = useHistory()

    const logout = async () => {
        try {
          const { data } = await signoutUser()
          history.push('/login')
        } catch (e) {
          alert(e)
        }
    }

    useEffect(async () => {
        getLoginStatus().then(res => {
            console.log(res)
            if (res === 'user not logged in') {
                console.log(res)
            } else {
                setIsLoggedIn(true)
                setUsername(res)
            }
          })
    }, []);


    if (isLoggedIn) {
        return(
            <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand href="/">CIS 550 FIFA  {username}</NavbarBrand>
              <Nav navbar>
              <NavItem>
                  <NavLink active href="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active href="/players">
                    Player Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/matches" >
                    Matches
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/clubs" >
                    Club Team Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/nationalteams" >
                    National Team Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/profile" >
                    Hello, {username}
                  </NavLink>
                </NavItem>
                <Button variant='light' onClick={() => logout()}> Log Out </Button>
              </Nav>
          </Navbar>
            )
    } else {
        return(
            <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand href="/">CIS 550 FIFA</NavbarBrand>
              <Nav navbar>
              <NavItem>
                  <NavLink active href="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active href="/players">
                    Player Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/matches" >
                    Matches
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/clubs" >
                    Club Team Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/nationalteams" >
                    National Team Stats
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/login" >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active  href="/signup" >
                    Signup
                  </NavLink>
                </NavItem>
              </Nav>
          </Navbar>
            )
    }
    

}