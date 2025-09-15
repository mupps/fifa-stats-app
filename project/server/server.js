const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose')
const session = require('cookie-session')
const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');
const AccountRouter = require('./routes/account')
require('dotenv').config()


const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}))

// // Route 1 - register as GET 
// app.get('/hello', routes.hello)

// // Route 2 - register as GET 
// app.get('/jersey/:choice', routes.jersey)

// // Route 3 - register as GET 
// app.get('/matches/:league', routes.all_matches)

// // Route 4 - register as GET 
// app.get('/players', routes.all_players)

// // Route 5 - register as GET 
// app.get('/match', routes.match)

// // Route 6 - register as GET 
// app.get('/player', routes.player)

// // Route 7 - register as GET 
// app.get('/search/matches', routes.search_matches)

// // Route 8 - register as GET 
// app.get('/search/players', routes.search_players)

// Route 2 - register as GET 
app.get('/players17', routes.all_players_17)

// Route 3 - register as GET
app.get('/players22', routes.all_players_22)

// Route 4 - register as GET
app.get('/clubs', routes.clubs)

// Route 5 - register as GET
app.get('/club', routes.club)

// Route 6 - register as GET
app.get('/nations', routes.nations)

// Route 7 - register as GET
app.get('/nation', routes.nation)

// Route 8 - register as GET 
app.get('/player_17', routes.player_17)

// Route 9 - register as GET 
app.get('/player_22', routes.player_22)

// Route 10 - register as GET 
app.get('/search/players_17', routes.search_players_17)

// Route 11 - register as GET 
app.get('/search/players_22', routes.search_players_22)

app.get('/flops', routes.flops)

app.get('/improved_stat', routes.improved_stat)

app.get('/nation_progress', routes.nation_progress)

app.get('/club_progress', routes.club_progress)

app.get('/club_players', routes.club_players)

app.get('/club_overall_17', routes.club_overall_17)

app.get('/club_overall_22', routes.club_overall_22)

app.get('/nation_overall_17', routes.nation_overall_17)

app.get('/nation_overall_22', routes.nation_overall_22)

app.post('/', (req, res) => {
    if (req.session.username && req.session.password) {
      res.send(`hello ${req.session.username}`)
    } else {
      res.send('please log in')
    }
})

app.use('/account', AccountRouter)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
