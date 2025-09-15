import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';
import s from 'styled-components';




import MenuBar from '../components/MenuBar';
import { getPlayerSearch, getPlayer, getPlayerImprovementStat, getLoginStatus, addToFavorites, getUserFavorites, getPlayer2022 } from '../fetcher'
const wideFormat = format('.3r');

const playerColumns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (text, row) => <a href={`/players?id=${row.id}`}>{text}</a>
    },
    {
        title: 'Nationality',
        dataIndex: 'Nationality',
        key: 'Nationality',
        sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
    },
    {
        title: 'Rating',
        dataIndex: 'Rating',
        key: 'Rating',
        sorter: (a, b) => a.Rating - b.Rating

    },
    {
        title: 'Potential',
        dataIndex: 'Potential',
        key: 'Potential',
        sorter: (a, b) => a.Potential - b.Potential
      },
      {
        title: 'Club',
        dataIndex: 'Club',
        key: 'Club',
        sorter: (a, b) => a.Club.localeCompare(b.Club)
      },
      {
        title: 'Value',
        dataIndex: 'Value',
        key: 'Value',
      },
];

const CenterWrapper = s.div`
width: 20px;
margin: 0 auto;
`;

class PlayersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            nationalityQuery: '',
            clubQuery: '',
            ratingHighQuery: 100,
            ratingLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedPlayerDetails: null,
            selectedPlayerDetails2022: null,
            playersResults: [],
            improvedStat: '',
            improvedStatType: '',
            username: '',
            userFavorites: [],
            favoritesActive: true

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleNationalityQueryChange = this.handleNationalityQueryChange.bind(this)
        this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handlePotentialChange = this.handlePotentialChange.bind(this)
        this.redirectToLogin = this.handleRedirectToLogin.bind(this)
        this.handleAddToFavorites = this.handleAddToFavorites.bind(this)
    }

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleClubQueryChange(event) {
        this.setState({ clubQuery: event.target.value })
    }

    handleNationalityQueryChange(event) {
        this.setState({ nationalityQuery: event.target.value })
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    handlePotentialChange(value) {
        this.setState({ potLowQuery: value[0] })
        this.setState({ potHighQuery: value[1] })
    }

    handleRedirectToLogin() {
        window.location.href = 'http://localhost:3000/login'
    }

    handleAddToFavorites() {
        addToFavorites(this.state.username, String(this.state.selectedPlayerId), this.state.selectedPlayerDetails.Name).then(res => {
            if (res === 'favorite added') {
                alert('Player added to favorites!')
            }
        })
    }


    updateSearchResults() {

        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

    }

    componentDidMount() {

        getLoginStatus().then(res => {
            if (res === 'user not logged in') {
            } else {
                this.setState({ username: res })
                getUserFavorites(this.state.username).then(res => {
                    this.setState({ userFavorites: res })
                    console.log(this.state.userFavorites)
                })
            }
        })

        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

        getPlayer2022(this.state.selectedPlayerId).then(res => {
            this.setState({ selectedPlayerDetails2022: res.results[0] })
        })

        getPlayer(this.state.selectedPlayerId).then(res => {
            // possibly write another then statement here and call getFavorites() and use that data 
            // if (this.state.userFavorites.includes(String(this.state.selectedPlayerId))) {
            //     this.setState({ favoritesActive: false })
            // } else {
            //     this.setState({ favoritesActive: true })
            // }
            this.setState({ selectedPlayerDetails: res.results[0] })
        })

        getPlayerImprovementStat(this.state.selectedPlayerId).then(res => {
            if (res.results[0]) {
                if (res.results[0].development > 0) {
                    this.setState({ improvedStat: `+${res.results[0].development}` })
                } else {
                    this.setState({ improvedStat: `${res.results[0].development}` })
                }
                this.setState({ improvedStatType: res.results[0].type })
            } else {
                this.setState({ improvedStatType: "None" })
            }
        })
    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Nationality</label>
                            <FormInput placeholder="Nationality" value={this.state.nationalityQuery} onChange={this.handleNationalityQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Club</label>
                            <FormInput placeholder="Club" value={this.state.clubQuery} onChange={this.handleClubQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h3>Player Search Results</h3>
                    <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                </div>
                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={4} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedPlayerDetails.Name}
                            {this.state.username ? <Button outline pill theme='info' onClick={this.handleAddToFavorites}>Add to favorites +</Button> 
                            : <Button pill theme='danger' onClick={this.redirectToLogin}>Log in to add to favorites</Button>}</h3>
                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedPlayerDetails.Photo} referrerPolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>Club: {this.state.selectedPlayerDetails.Club}</h5>
                                </Col>
                                <Col>
                                <h5>Nationality: {this.state.selectedPlayerDetails.Nationality}</h5>
                                </Col>
                                <Col>
                                <h5>Position: {this.state.selectedPlayerDetails.position}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Age: {this.state.selectedPlayerDetails.Age}
                                </Col>
                                <Col>
                                Height: {this.state.selectedPlayerDetails.Height}
                                </Col>
                                <Col>
                                Weight: {this.state.selectedPlayerDetails.Weight}
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                Wage: {this.state.selectedPlayerDetails.Wage}
                                </Col>
                                <Col>
                                Most Improved Stat from 2017 to 2022: {`${this.state.improvedStatType} (${this.state.improvedStat})`}
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='left' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill in 2017</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.skill_moves} />
                            <h6>Reputation</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.international_rep} />
                            <h6>International Reputation</h6>
                            
                            <Divider/>
                                <h6>Potential</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Potential} >{this.state.selectedPlayerDetails.Potential}</Progress>
                                <h6>Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Rating} >{this.state.selectedPlayerDetails.Rating}</Progress>
                                </Col >
                            {this.state.selectedPlayerDetails2022 ? 
                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <h6>Skill in 2022</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails2022.skill_moves} />
                            <h6>Reputation</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails2022.international_rep} />
                            <h6>International Reputation</h6>
                            
                            <Divider/>
                            <h6>Potential</h6>
                            <Progress style={{ width: '20vw' }} value={this.state.selectedPlayerDetails2022.Potential} >{this.state.selectedPlayerDetails2022.Potential}</Progress>
                            <h6>Rating</h6>
                            <Progress style={{ width: '20vw' }} value={this.state.selectedPlayerDetails2022.Rating} >{this.state.selectedPlayerDetails2022.Rating}</Progress>
                            </Col > : null}
                            </Row>
                        </CardBody>
                    </Card>

                    {this.state.selectedPlayerDetails2022 ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col>

                                {this.state.selectedPlayerDetails.position === 'GK'?<BarChart
                            width={600}
                            height={300}
                            data={[
                                {
                                  name: 'Diving',
                                  Fifa2017: this.state.selectedPlayerDetails.GK_diving,
                                  Fifa2022: this.state.selectedPlayerDetails2022.GK_diving,
                                  amt: 100,
                                },
                                {
                                    name: 'Handling',
                                    Fifa2017: this.state.selectedPlayerDetails.GK_handling,
                                    Fifa2022: this.state.selectedPlayerDetails2022.GK_handling,
                                    amt: 100,
                                },
                                {
                                    name: 'Kicking',
                                    Fifa2017: this.state.selectedPlayerDetails.GK_kicking,
                                    Fifa2022: this.state.selectedPlayerDetails2022.GK_kicking,
                                    amt: 100,
                                },
                                {
                                    name: 'Positioning',
                                    Fifa2017: this.state.selectedPlayerDetails.GK_position,
                                    Fifa2022: this.state.selectedPlayerDetails2022.GK_position,
                                    amt: 100,
                                },
                                {
                                    name: 'Reflexes',
                                    Fifa2017: this.state.selectedPlayerDetails.GK_reflexes,
                                    Fifa2022: this.state.selectedPlayerDetails2022.GK_reflexes,
                                    amt: 100,
                                  },
                              ]}
                            margin={{
                              top: 5,
                              right: 20,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Fifa2017" fill="#8884d8" />
                            <Bar dataKey="Fifa2022" fill="#82ca9d" />
                          </BarChart> : <BarChart
                            width={600}
                            height={300}
                            data={[
                                {
                                  name: 'Strength',
                                  Fifa2017: this.state.selectedPlayerDetails.strength,
                                  Fifa2022: this.state.selectedPlayerDetails2022.strength,
                                  amt: 100,
                                },
                                {
                                    name: 'Agility',
                                    Fifa2017: this.state.selectedPlayerDetails.agility,
                                    Fifa2022: this.state.selectedPlayerDetails2022.agility,
                                    amt: 100,
                                },
                                {
                                    name: 'Balance',
                                    Fifa2017: this.state.selectedPlayerDetails.balance,
                                    Fifa2022: this.state.selectedPlayerDetails2022.balance,
                                    amt: 100,
                                },
                                {
                                    name: 'Dribbling',
                                    Fifa2017: this.state.selectedPlayerDetails.acceleration,
                                    Fifa2022: this.state.selectedPlayerDetails2022.acceleration,
                                    amt: 100,
                                },
                                {
                                    name: 'Stamina',
                                    Fifa2017: this.state.selectedPlayerDetails.stamina,
                                    Fifa2022: this.state.selectedPlayerDetails2022.stamina,
                                    amt: 100,
                                  },
                              ]}
                            margin={{
                              top: 5,
                              right: 20,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Fifa2017" fill="#8884d8" />
                            <Bar dataKey="Fifa2022" fill="#82ca9d" />
                          </BarChart>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    </div> : null}

                </div> : null}

            </div>
        )
    }
}

export default PlayersPage

