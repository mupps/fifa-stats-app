import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players17?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player_17?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer2022 = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player_22?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players_17?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getSignupUser = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/signup`, {
        method: 'POST',
    })
    return res.json()
}

const getPlayerImprovementStat = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/improved_stat?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}


const getLoginUser = async (username, password) => {
    let request_object = {
        username: username,
        password: password
    }
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {  
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(request_object)
        })
    return res.json()
}

const getLoginStatus = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/isLoggedIn`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }})
    return res.json()
}

const addToFavorites = async (username, playerID, playerName) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/addFavorite?username=${username}&playerID=${playerID}&playerName=${playerName}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }})
    return res.json()
}

const getUserFavorites = async (username, playerID) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/getFavorites?username=${username}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }})
    return res.json()
}

const signoutUser = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/account/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {  
            'Content-Type': 'application/json'
        }})
    return res.json()
}

const getAllFlops = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/flops`, {
        method: 'GET'
    })
    return res.json()
}

const getAllClubs= async (clubQuery) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/clubs?clubQuery=${clubQuery}`, {
        method: 'GET'
    })
    return res.json()
}

const getAllNations= async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nations`, {
        method: 'GET'
    })
    return res.json()
}

const getNationPlayers = async (nationality) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players_17?Nationality=${nationality}`, {
        method: 'GET',
    })
    return res.json()
}

const getNationProgress = async (nationality) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nation_progress?name=${nationality}`, {
        method: 'GET',
    })
    return res.json()
}

const getNationOverall17 = async (nationality) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nation_overall_17?nationality=${nationality}`, {
        method: 'GET',
    })
    return res.json()
}

const getNationOverall22= async (nationality) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/nation_overall_22?nationality=${nationality}`, {
        method: 'GET',
    })
    return res.json()
}

const getClubProgress = async (club) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/club_progress?name=${club}`, {
        method: 'GET',
    })
    return res.json()
}

const getClubOverall17 = async (club) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/club_overall_17?club=${club}`, {
        method: 'GET',
    })
    return res.json()
}

const getClubOverall22 = async (club) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/club_overall_22?club=${club}`, {
        method: 'GET',
    })
    return res.json()
}

const getClubPlayers = async (club) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/club_players?club=${club}`, {
        method: 'GET',
    })
    return res.json()
}














export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,
    getLoginStatus,
    getLoginUser,
    signoutUser,
    getPlayerImprovementStat,
    addToFavorites,
    getUserFavorites,
    getAllFlops,
    getAllClubs,
    getAllNations,
    getNationPlayers,
    getPlayer2022,
    getNationProgress,
    getNationOverall17,
    getNationOverall22,
    getClubProgress,
    getClubOverall17,
    getClubOverall22,
    getClubPlayers
}