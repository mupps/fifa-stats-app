const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');
require('dotenv').config()

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************
// Route 2 (handler)
async function all_players_17(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
            FROM Players17
            ORDER BY Name
            LIMIT ${offset},${req.query.pagesize}`, function (error, results, fields) {

                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            const offset = (req.query.page - 1) * 10
            connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
            FROM Players17
            ORDER BY Name
            LIMIT ${offset},10`, function (error, results, fields) {
                
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });

        }
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
        FROM Players17
        ORDER BY Name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 3 (handler)
async function all_players_22(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
            FROM Players22
            ORDER BY Name
            LIMIT ${offset},${req.query.pagesize}`, function (error, results, fields) {

                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            const offset = (req.query.page - 1) * 10
            connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
            FROM Players22
            ORDER BY Name
            LIMIT ${offset},10`, function (error, results, fields) {
                
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });

        }
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT id, Name, Nationality, Overall_Rating as Rating, Potential, Club, Value
        FROM Players22
        ORDER BY Name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 4 (handler)
async function clubs(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            connection.query(`SELECT name, logo
            FROM Clubs
            ORDER BY name
            LIMIT ${offset},${req.query.pagesize}`, function (error, results, fields) {

                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            if (req.query.name == null) {
                const offset = (req.query.page - 1) * 10
                connection.query(`SELECT name, logo
                FROM Clubs
                ORDER BY name
                LIMIT ${offset},10`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
            } else {
                const offset = (req.query.page - 1) * 10
                connection.query(`SELECT name, logo
                FROM Clubs
                WHERE name LIKE '%${req.query.name}%'
                ORDER BY name
                LIMIT ${offset},10`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
            }

        }
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        if (req.query.clubQuery || req.query.clubQuery !== '') {
            connection.query(`SELECT name, logo
            FROM Clubs
            WHERE name LIKE '%${req.query.clubQuery}%'
            ORDER BY name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
            });
        } else {
            connection.query(`SELECT name, logo
            FROM Clubs
            ORDER BY name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
            });
        }
    }
}

// Route 6 (handler)
async function nations(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            connection.query(`SELECT name, flag
            FROM Nations
            ORDER BY name
            LIMIT ${offset},${req.query.pagesize}`, function (error, results, fields) {

                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            const offset = (req.query.page - 1) * 10
            connection.query(`SELECT name, flag
            FROM Nations
            ORDER BY name
            LIMIT ${offset},10`, function (error, results, fields) {
                
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            });

        }
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT name, flag
        FROM Nations
        ORDER BY Name`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 5 (handler)
async function club(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT BestPosition FROM Players
        WHERE PlayerId=${req.query.id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length === 0) {
                    res.json({ results: [] })
                } else {
                    if (results[0].BestPosition === 'GK') {
                        connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                        Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight,
                        BestPosition, BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking,
                        GKPositioning, GKReflexes
                        FROM Players
                        WHERE PlayerId=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    } else {
                        connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                        Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight,
                        BestPosition, BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina,
                        NStrength, NPositioning
                        FROM Players
                        WHERE PlayerId=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.json({ results: [] })
    }
}

// Route 7 (handler)
async function nation(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT BestPosition FROM Players
        WHERE PlayerId=${req.query.id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length === 0) {
                    res.json({ results: [] })
                } else {
                    if (results[0].BestPosition === 'GK') {
                        connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                        Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight,
                        BestPosition, BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking,
                        GKPositioning, GKReflexes
                        FROM Players
                        WHERE PlayerId=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    } else {
                        connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                        Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight,
                        BestPosition, BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina,
                        NStrength, NPositioning
                        FROM Players
                        WHERE PlayerId=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.json({ results: [] })
    }
}

// Route 8 (handler)
async function player_17(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT position FROM Players17
        WHERE id=${req.query.id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length === 0) {
                    res.json({ results: [] })
                } else {
                    if (results[0].position === 'GK') {
                        connection.query(`SELECT id, Name, Age, Photo, Nationality, overall_rating as Rating, Potential, Club,
                        Value, Wage, international_rep, skill_moves, Height, Weight,
                        position, GK_diving, GK_handling, GK_kicking,
                        GK_position, GK_reflexes
                        FROM Players17
                        WHERE id=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    } else {
                        connection.query(`SELECT id, Name, Age, Photo, Nationality, overall_rating as Rating, Potential, Club,
                        Value, Wage, international_rep, skill_moves, Height, Weight,
                        position, crossing, finishing, heading_acc, short_passing, volleys, dribbling, curve, FK_acc, 
                        long_passing, ball_control, acceleration, sprint_speed, agility, reactions, balance, shot_power,
                        jumping, stamina, strength, long_shots, aggression, interceptions, positioning, vision, penalties, 
                        composure, standing_tackle, sliding_tackle
                        FROM Players17
                        WHERE id=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.json({ results: [] })
    }
}

// Route 9 (handler)
async function player_22(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT position FROM Players22
        WHERE id=${req.query.id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length === 0) {
                    res.json({ results: [] })
                } else {
                    if (results[0].position === 'GK') {
                        connection.query(`SELECT id, Name, Age, Photo, Nationality, overall_rating as Rating, Potential, Club,
                        Value, Wage, international_rep, skill_moves, Height, Weight,
                        position, GK_diving, GK_handling, GK_kicking,
                        GK_position, GK_reflexes
                        FROM Players22
                        WHERE id=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    } else {
                        connection.query(`SELECT id, Name, Age, Photo, Nationality, overall_rating as Rating, Potential, Club,
                        Value, Wage, international_rep, skill_moves, Height, Weight,
                        position, crossing, finishing, heading_acc, short_passing, volleys, dribbling, curve, FK_acc, 
                        long_passing, ball_control, acceleration, sprint_speed, agility, reactions, balance, shot_power,
                        jumping, stamina, strength, long_shots, aggression, interceptions, positioning, vision, penalties, 
                        composure, standing_tackle, sliding_tackle
                        FROM Players22
                        WHERE id=${req.query.id}`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.json({ results: [] })
    }
}

// Route 10 (handler)
async function search_players_17(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var sqlString = `SELECT id, Name, Nationality, overall_rating as Rating, Potential, Club, Value
    FROM Players17 WHERE `
    const ratingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const ratingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100
    const potentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0
    const potentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100
    if (req.query.Name || req.query.Nationality || req.query.Club) {
        if (req.query.Name) {
            sqlString += `Name LIKE '%${req.query.Name}%'`
        }
        if (req.query.Nationality) {
            if (req.query.Name) {
                sqlString += ` AND `
            }
            sqlString += `Nationality LIKE '%${req.query.Nationality}%'`
        }
        if (req.query.Club) {
            if (req.query.Name || req.query.Nationality) {
                sqlString += ` AND `
            }
            sqlString += `Club LIKE '%${req.query.Club}%'`
        }
        sqlString += ` AND overall_rating > ${ratingLow} AND overall_rating < ${ratingHigh}`
        sqlString += ` AND Potential > ${potentialLow} AND Potential < ${potentialHigh}`
        sqlString += ` ORDER BY Name`
    } else {
        sqlString += ` overall_rating > ${ratingLow} AND overall_rating < ${ratingHigh}`
        sqlString += ` AND Potential > ${potentialLow} AND Potential < ${potentialHigh}`
        sqlString += ` ORDER BY Name`
    }
    if (req.query.page && !isNaN(req.query.page)) {
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            sqlString += ` LIMIT ${offset},${req.query.pagesize}`
        } else {
            const offset = (req.query.page - 1) * 10
            sqlString += ` LIMIT ${offset},${10}`
        }
    }
    connection.query(sqlString, function (error, results, fields) {
        
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 11 - register as GET 
async function search_players_22(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    var sqlString = `SELECT id, Name, Nationality, overall_rating as Rating, Potential, Club, Value
    FROM Players22 WHERE `
    const ratingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const ratingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100
    const potentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0
    const potentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100
    if (req.query.Name || req.query.Nationality || req.query.Club) {
        if (req.query.Name) {
            sqlString += `Name LIKE '%${req.query.Name}%'`
        }
        if (req.query.Nationality) {
            if (req.query.Name) {
                sqlString += ` AND `
            }
            sqlString += `Nationality LIKE '%${req.query.Nationality}%'`
        }
        if (req.query.Club) {
            if (req.query.Name || req.query.Nationality) {
                sqlString += ` AND `
            }
            sqlString += `Club LIKE '%${req.query.Club}%'`
        }
        sqlString += ` AND overall_rating > ${ratingLow} AND overall_rating < ${ratingHigh}`
        sqlString += ` AND Potential > ${potentialLow} AND Potential < ${potentialHigh}`
        sqlString += ` ORDER BY Name`
    } else {
        sqlString += ` overall_rating > ${ratingLow} AND overall_rating < ${ratingHigh}`
        sqlString += ` AND Potential > ${potentialLow} AND Potential < ${potentialHigh}`
        sqlString += ` ORDER BY Name`
    }
    if (req.query.page && !isNaN(req.query.page)) {
        if (req.query.pagesize && !isNaN(req.query.pagesize)) {
            const offset = (req.query.page - 1) * req.query.pagesize
            sqlString += ` LIMIT ${offset},${req.query.pagesize}`
        } else {
            const offset = (req.query.page - 1) * 10
            sqlString += ` LIMIT ${offset},${10}`
        }
    }
    connection.query(sqlString, function (error, results, fields) {
        
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 12 - flops
 async function flops(req, res) {

    connection.query(`WITH Top_Pot_17 AS (SELECT id, Name, Potential, overall_rating as Rating, Club FROM Players17 WHERE overall_rating <= 85 AND Potential >= 80 ORDER BY potential desc) SELECT P17.id as id, P17.name as Name, P17.potential as Potential, P17.Rating AS fifa17_rating, P22.overall_rating AS fifa22_rating, (P22.overall_rating - P17.Rating) AS Development FROM Top_Pot_17 P17 join Players22 P22 ON P17.id = P22.id ORDER BY development LIMIT 20`, function (error1, results1, fields) {

                        
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

async function nation_progress(req, res) {

    connection.query(`WITH Attacking_Players_22 AS (SELECT Players22.name, Players22.overall_rating, Players22.nationality FROM Players22 JOIN Nations ON Players22.nationality = Nations.name WHERE Players22.nationality='${req.query.name}' AND (Players22.position = 'RW' OR Players22.position = 'LW' OR Players22.position = 'ST' OR Players22.position = 'CF' OR Players22.position = 'RF' OR Players22.position = 'LF') ORDER BY Players22.overall_rating DESC LIMIT 6), Defense_Players_22 AS ( SELECT Players22.name, Players22.overall_rating, Players22.nationality FROM Players22 JOIN Nations on Players22.nationality = Nations.name WHERE Players22.nationality='${req.query.name}' AND(Players22.position = 'LB' OR Players22.position = 'RB' OR Players22.position = 'CB' OR Players22.position = 'RWB' OR Players22.position = 'LWB') ORDER BY Players22.overall_rating DESC LIMIT 6 ), Attacking_Players_17 AS ( SELECT Players17.name, Players17.overall_rating, Players17.nationality FROM Players17 JOIN Nations on Players17.nationality = Nations.name WHERE Players17.nationality='${req.query.name}' AND (Players17.position = 'RW' OR Players17.position = 'LW' OR Players17.position = 'ST' OR Players17.position = 'CF' OR Players17.position = 'RF' OR Players17.position = 'LF') ORDER BY Players17.overall_rating DESC LIMIT 6 ), Defense_Players_17 AS ( SELECT Players17.name, Players17.overall_rating, Players17.nationality FROM Players17 JOIN Nations on Players17.nationality = Nations.name WHERE (Players17.position = 'LB' OR Players17.position = 'RB' OR Players17.position = 'CB' OR Players17.position = 'RWB' OR Players17.position = 'LWB') ORDER BY Players17.overall_rating DESC LIMIT 6 ) SELECT (SUM(AP17.overall_rating) / COUNT(AP17.overall_rating)) As Attacking_power_17, (SUM(AP22.overall_rating) / COUNT(AP22.overall_rating)) As Attacking_power_22, (SUM(DP17.overall_rating) / COUNT(DP17.overall_rating)) As Defensive_Power_17, (SUM(DP22.overall_rating) / COUNT(DP22.overall_rating)) As Defensive_Power_22 FROM Attacking_Players_22 AP22, Defense_Players_22 DP22, Attacking_Players_17 AP17, Defense_Players_17 DP17;`, function (error1, results1, fields) {      
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

async function club_progress(req, res) {

    connection.query(`WITH Attacking_Players_22 AS (
        SELECT Players22.name, Players22.overall_rating, Players22.club
        FROM Players22 JOIN Clubs on Players22.club = Clubs.name
        WHERE Players22.club = '${req.query.name}' AND
              (Players22.position = 'RW' OR Players22.position = 'LW' OR Players22.position = 'ST' OR Players22.position = 'CF' OR Players22.position = 'RF' OR Players22.position = 'LF')
        ORDER BY Players22.overall_rating DESC
          LIMIT 6
      ),
        Defense_Players_22 AS (
        SELECT Players22.name, Players22.overall_rating, Players22.club
        FROM Players22 JOIN Clubs on Players22.club = Clubs.name
        WHERE Players22.club = '${req.query.name}' AND
              (Players22.position = 'LB' OR Players22.position = 'RB' OR Players22.position = 'CB' OR Players22.position = 'RWB' OR Players22.position = 'LWB')
        ORDER BY Players22.overall_rating DESC
            LIMIT 6
      ),
        Attacking_Players_17 AS (
        SELECT P17.name, P17.overall_rating, P17.club
        FROM Players17 P17 JOIN Clubs C2 on P17.club = C2.name
        WHERE P17.club = '${req.query.name}' AND
              (P17.position = 'RW' OR P17.position = 'LW' OR P17.position = 'ST' OR P17.position = 'CF' OR P17.position = 'RF' OR P17.position = 'LF')
        ORDER BY P17.overall_rating DESC
          LIMIT 6
      ),
          Defense_Players_17 AS (
        SELECT P17.name, P17.overall_rating, P17.club
        FROM Players17 P17 JOIN Clubs C2 on P17.club = C2.name
        WHERE P17.club = '${req.query.name}' AND
              (P17.position = 'LB' OR P17.position = 'RB' OR P17.position = 'CB' OR P17.position = 'RWB' OR P17.position = 'LWB')
        ORDER BY P17.overall_rating DESC
            LIMIT 6
      )
        SELECT (SUM(AP17.overall_rating) / COUNT(AP17.overall_rating)) As Attacking_power_17, (SUM(AP22.overall_rating) / COUNT(AP22.overall_rating)) As Attacking_power_22, (SUM(DP17.overall_rating) / COUNT(DP17.overall_rating)) As Defensive_Power_17, (SUM(DP22.overall_rating) / COUNT(DP22.overall_rating)) As Defensive_Power_22
        FROM Attacking_Players_22 AP22, Defense_Players_22 DP22, Attacking_Players_17 AP17, Defense_Players_17 DP17;`, function (error1, results1, fields) {      
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

// club_overall 17
 async function club_overall_17(req, res) {

    connection.query(`WITH Club_players AS (SELECT Players17.id, Players17.overall_rating, Players17.club FROM Players17 WHERE Players17.club = '${req.query.club}' ORDER BY Players17.overall_rating DESC LIMIT 11) SELECT Clubs.name, (SUM(Club_players.overall_rating) /11) AS normalized_overall_rating FROM Club_players join Clubs on Club_players.club = Clubs.name`, function (error1, results1, fields) {          
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

// club_overall 22
async function club_overall_22(req, res) {

    connection.query(`WITH Club_players AS (SELECT Players22.id, Players22.overall_rating, Players22.club FROM Players22 WHERE Players22.club = '${req.query.club}' ORDER BY Players22.overall_rating DESC LIMIT 11) SELECT Clubs.name, (SUM(Club_players.overall_rating) /11) AS normalized_overall_rating FROM Club_players join Clubs on Club_players.club = Clubs.name`, function (error1, results1, fields) {

                        
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

// nation_overall 17
async function club_players(req, res) {

    connection.query(`SELECT Players17.id, Players17.name,Players17.nationality, Players17.club, Players17.value, Players17.overall_rating as Rating, Players17.potential as Potential
    FROM Players17
    JOIN Clubs ON Players17.club = Clubs.name
    WHERE Players17.club = '${req.query.club}'`, function (error1, results1, fields) {

                        
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}


// nation_overall 17
async function nation_overall_17(req, res) {

    connection.query(`WITH Nation_players AS (SELECT Players17.id, Players17.overall_rating, Players17.nationality FROM Players17 WHERE Players17.nationality= '${req.query.nationality}' ORDER BY Players17.overall_rating DESC LIMIT 11) SELECT Nations.name, (SUM(Nation_players.overall_rating) /11) AS normalized_overall_rating FROM Nation_players join Nations on Nation_players.nationality = Nations.name`, function (error1, results1, fields) {

                        
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}

// nation_overall 22
async function nation_overall_22(req, res) {

    connection.query(`WITH Nation_players AS (SELECT Players22.id, Players22.overall_rating, Players22.nationality FROM Players22 WHERE Players22.nationality= '${req.query.nationality}' ORDER BY Players22.overall_rating DESC LIMIT 11) SELECT Nations.name, (SUM(Nation_players.overall_rating) /11) AS normalized_overall_rating FROM Nation_players join Nations on Nation_players.nationality = Nations.name`, function (error1, results1, fields) {

                        
                      if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }  

                });
}
async function improved_stat(req, res) {
    if (req.query.id && !isNaN(req.query.id)) {
        connection.query(`SELECT position FROM Players17
        WHERE id=${req.query.id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length === 0) {
                    res.json({ results: [] })
                } else {
                    if (results[0].position === 'GK') {
                        connection.query(`SELECT (Players22.GK_diving - Players17.GK_diving) AS development, "GK_diving" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.GK_handling - Players17.GK_handling) AS development, "GK_handling" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.GK_kicking - Players17.GK_kicking) AS development, "GK_kicking" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.GK_position - Players17.GK_position) AS development, "GK_position" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.GK_reflexes - Players17.GK_reflexes) AS development, "GK_reflexes" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
ORDER BY development DESC
LIMIT 1;`, function (error1, results1, fields) {
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    } else {
                        connection.query(`SELECT (Players22.crossing - Players17.crossing) AS development, "crossing" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.finishing - Players17.finishing) AS development, "finishing" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.heading_acc - Players17.heading_acc) AS development, "heading_acc" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.short_passing - Players17.short_passing) AS development, "short_passing" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.volleys - Players17.volleys) AS development, "volleys" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.dribbling - Players17.dribbling) AS development, "dribbling" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.curve - Players17.curve) AS development, "curve" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.FK_acc - Players17.FK_acc) AS development, "FK_acc" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.long_passing - Players17.long_passing) AS development, "long_passing" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.ball_control - Players17.ball_control) AS development, "ball_control" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.acceleration - Players17.acceleration) AS development, "acceleration" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.sprint_speed - Players17.sprint_speed) AS development, "sprint_speed" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.agility - Players17.agility) AS development, "agility" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.reactions - Players17.reactions) AS development, "reactions" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.balance - Players17.balance) AS development, "balance" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.shot_power - Players17.shot_power) AS development, "shot_power" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.jumping - Players17.jumping) AS development, "jumping" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.stamina - Players17.stamina) AS development, "stamina" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.strength - Players17.strength) AS development, "strength" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.long_shots - Players17.long_shots) AS development, "long_shots" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.aggression - Players17.aggression) AS development, "aggression" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.interceptions - Players17.interceptions) AS development, "interceptions" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.positioning - Players17.positioning) AS development, "positioning" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.vision - Players17.vision) AS development, "vision" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.penalties - Players17.penalties) AS development, "penalties" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.composure - Players17.composure) AS development, "composure" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.standing_tackle - Players17.standing_tackle) AS development, "standing_tackle" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
UNION
SELECT (Players22.sliding_tackle - Players17.sliding_tackle) AS development, "sliding_tackle" AS type
FROM Players17, Players22
WHERE Players17.id = ${req.query.id} AND Players22.id = ${req.query.id}
ORDER BY development DESC
LIMIT 1;`, function (error1, results1, fields) {
                
                            if (error1) {
                                console.log(error1)
                                res.json({ error: error1 })
                            } else if (results1) {
                                res.json({ results: results1 })
                            }
                        });
                    }
                }
            }
        });
    } else {
        res.json({ results: [] })
    }
}

module.exports = {
    all_players_17,
    all_players_22,
    clubs,
    club,
    nations,
    nation,
    player_17,
    player_22,
    search_players_17,
    search_players_22,
    improved_stat,
    flops,
    nation_progress,
    club_progress,
    club_overall_17,
    club_overall_22,
    club_players,
    nation_overall_17,
    nation_overall_22,
}
