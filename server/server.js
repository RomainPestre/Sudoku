const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const app = express()
const users = require('./users.json')
const books = require('./books.json')

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080'
  })
)
app.use(
  session({
    secret: 'motDePasse',
    resave: false,
    saveUninitialized: true,
    name: 'session1',
    cookie: { secure: false }
  })
)
app.use(morgan('dev'))
app.use(bodyParser.json())

const path = require('path')
app.use(express.static(path.join(__dirname, '../dist/')))

app.post('/api/login', (req, res) => {
  console.log('req.body', req.body)
  if (!req.session.userId) {
    const user = users.find(
      u => u.username === req.body.username && u.password === req.body.password
    )
    if (!user) {
      res.status(401)
      res.json({
        message: 'error : user not found'
      })
    } else {
      // connect the user
      req.session.userId = user.userId
      res.json({
        message: 'connected'
      })
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
})
app.post('/api/register', (req, res) => {
  if (!req.session.userId) {
    let bodyName = req.body.username
    let bodyPassword = req.body.password
    if (!users.find(user => user.username === bodyName)) {
      if (bodyName && bodyName.length >= 4 && bodyPassword && bodyPassword.length >= 4) {
        users.push({
          userId: users.length + 1,
          username: bodyName,
          password: bodyPassword,
          books: []
        })
        req.session.userId = users.length
        res.json({
          message: 'connected'
        })
      } else {
        res.status(401).json({
          message: 'invalid password or username (length must be at least 4)'
        })
      }
    } else {
      res.status(401).json({
        message: 'this username is taken'
      })
    }
  } else {
    res.status(401).json({
      message: 'you are already connected'
    })
  }
})
app.get('/api/logout', (req, res) => {
  if (!req.session.userId) {
    res.status(401)
    res.json({
      message: 'you are already disconnected'
    })
  } else {
    req.session.destroy()
    res.clearCookie('session1')
    res.json({
      message: 'you are now disconnected'
    })
  }
})
app.get('/api/books', (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({
      message: 'you need to be connected'
    })
  } else {
    let userBooks = []
    for (let index of users[req.session.userId - 1].books) userBooks.push(books[index])
    res.json({ books: userBooks })
  }
})
app.get('/api/allBooks', (req, res) => {
  res.json({ books: books })
})
app.get('/api/isConnected', (req, res) => {
  if (!req.session.userId) res.json({ connected: false })
  else {
    res.json({ connected: true })
  }
})
app.post('/api/addBook/:id', (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({
      error: 'you need to be connected'
    })
  } else {
    if (users[req.session.userId - 1].books.findIndex(bookId => bookId === parseInt(req.params.id)) === -1) {
      users[req.session.userId - 1].books.push(parseInt(req.params.id))
      res.json({ message: 'successfully added !' })
    } else {
      res.status(401).json({ error: 'book already in your list !' })
    }
  }
})
app.post('/api/deleteBook/:id', (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({
      error: 'you need to be connected'
    })
  } else {
    let bookIndex = users[req.session.userId - 1].books.findIndex(bookId => bookId === parseInt(req.params.id))
    if (bookIndex !== -1) {
      users[req.session.userId - 1].books.splice(parseInt(bookIndex), 1)
      res.json({ message: 'successfully deleted !' })
    } else {
      res.status(401).json({ error: 'book not in your list !' })
    }
  }
})
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
