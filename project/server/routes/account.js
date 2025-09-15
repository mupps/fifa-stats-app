const express = require('express')
const User = require('../models/User')

const router = express.Router()

// signup and create an account in Users NoSQL DB
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    if (username == null || password == null ||
      username === '' || password === '') {
      res.send('one or more fields left blank')
    } else {
      const user = await User.findOne({ username })
      if (user) {
        res.send('user already exists')
      } else {
        await User.create({ username, password, })
        res.send('user created successfully')
      }
    }
  } catch {
    next(new Error('error when creating user'))
  }
})

// login and checkpassword (basic version)
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (username === '' || password === '' ||
    username == null || password == null) {
      res.json('one or more fields left blank')
    } else {
      if (!user) {
        res.json('user does not exist')
      } else {
        const { password: passDB } = user
  
        if (password === passDB) {
          req.session.username = username
          req.session.password = password
          res.json('user logged in successfully')
        } else {
          res.json('incorrect password')
        }
      }
    }
  } catch (err) {
    next(new Error('error when logging in user'))
  }
})

// logout accoount if logged in
router.post('/logout', (req, res) => {
  if (req.session.username == null || req.session.username === '') {
    res.json('user is already not logged in')
  } else {
    req.session.username = null
    req.session.password = null
    res.json('user successfully logged out')
  }
})

// check if current user is logged in or not
router.post('/isLoggedIn', async (req, res) => {
  if (req.session.username == null || req.session.password == null ||
    req.session.username === '' || req.session.password === '') {
    res.json('user not logged in')
  } else {
    res.json(req.session.username)
  }
})

// add playerID to favorites array for user
router.post('/addFavorite', async (req, res) => {
    const username = req.query.username
    const idToAdd = req.query.playerID
    const nameToAdd = req.query.playerName
    const favoriteToAdd = {
        favoritesID: idToAdd,
        favoritesName: nameToAdd
    }
    try {
      await User.findOneAndUpdate({ username: username }, { $addToSet: { favorites: favoriteToAdd }},
        function (error, success) {
            if (error) {
                res.json('error when favorite added')
            } else {
                console.log(success)
                res.json('favorite added')
            }
        })
    } catch {
    //   res.json('other error')
    }
  })

// get all favorites of a user
router.get('/getFavorites', async (req, res, next) => {
      const username = req.query.username
      try {
        if (username === '' || username == null) {
          res.json('one or more fields left blank')
        } else {
          const user = await User.findOne({ username })
          if (!user) {
            res.json('user does not exist')
          } else {
            const { favorites } = user
            res.json(favorites)
          }
        }
      } catch (err) {
        next(new Error('error when getting favorites'))
      }
    })

module.exports = router
