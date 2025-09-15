import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider
} from 'antd'

import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import MenuBar from '../components/MenuBar';

import { getAllClubs, getClubOverall22, getClubOverall17, getClubProgress, getClubPlayers } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const playerColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, row) => <a href={`/players?id=${row.id}`}>{text}</a>
    },
    {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality',
        sorter: (a, b) => a.nationality.localeCompare(b.nationality)
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
        dataIndex: 'club',
        key: 'club',
        sorter: (a, b) => a.club.localeCompare(b.club)
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      },
];

const clubColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, row) => <a href={`/clubs?name=${row.name}`}>{text}</a>
  },
  // TASK 9: add a column for Value - no sorting required
  {
    title: 'Logo',
    dataIndex: 'logo',
    render: (text, row) => <img src={row.logo} referrerPolicy="no-referrer" alt={null} style={{height:'10vh'}}/>
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      clubsResults: [],
      clubsPageNumber: 1,
      clubsPageSize: 10,
      clubQuery: '',
      pagination: null,
      loggedIn: false,
      selectedClub: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
      selectedClubPlayers: [],
      selectedClubProgress: null,
      selectedClubOverall17: null,
      selectedClubOverall22: null,
    }
    this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
    this.goToClub = this.goToClub.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
  }

  handleClubQueryChange(event) {
    this.setState({ clubQuery: event.target.value })
  }


  goToClub(clubName) {
    window.location = `/clubs?name=${clubName}`
  }

  componentDidMount() {
    getAllClubs(this.state.clubQuery).then(res => {
      this.setState({ clubsResults: res.results })
    })

    getClubPlayers(this.state.selectedClub).then(res => {
        this.setState({ selectedClubPlayers: res.results })
        console.log(this.state.selectedClubPlayers)
    })

    getClubOverall17(this.state.selectedClub).then(res => {
        this.setState({ selectedClubOverall17: res.results[0] })
    })

    getClubOverall22(this.state.selectedClub).then(res => {
        this.setState({ selectedClubOverall22: res.results[0] })
    })

    getClubProgress(this.state.selectedClub).then(res => {
        this.setState({ selectedClubProgress: res.results[0] })
    })
  }

  updateSearchResults() {
    getAllClubs(this.state.clubQuery).then(res => {
        this.setState({ clubsResults: res.results })
      })
  }


  render() {

    return (
      <div>
        <MenuBar />
        <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
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
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Clubs</h3>
          <Table dataSource={this.state.clubsResults} columns={clubColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
        {this.state.selectedClubPlayers && this.state.selectedClubPlayers.length > 0 ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <h3>{decodeURI(this.state.selectedClub)}</h3>
            <h5> Players from {decodeURI(this.state.selectedClub)}: </h5>
            <Table dataSource={this.state.selectedClubPlayers} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            { this.state.selectedClubProgress !== null && this.state.selectedClubOverall17 !== null && this.state.selectedClubOverall22 !== null ? <div>
                <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <h3> Club Stats for {decodeURI(this.state.selectedClub)}: </h3>
                            <Row gutter='30' align='left' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Attacking Power in 2017: {this.state.selectedClubProgress.Attacking_power_17}</h6>
                            <h6>Defensive Power in 2017: {this.state.selectedClubProgress.Defensive_Power_17}</h6>
                            <h6>Normalized Team Rating in 2017: {this.state.selectedClubOverall17.normalized_overall_rating}</h6>
                            </Col>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Attacking Power in 2022: {this.state.selectedClubProgress.Attacking_power_22}</h6>
                            <h6>Defensive Power in 2022: {this.state.selectedClubProgress.Defensive_Power_22}</h6>
                            <h6>Normalized Team Rating in 2022: {this.state.selectedClubOverall22.normalized_overall_rating}</h6>
                            </Col>
                            </Row>
                            <Divider />
                            <BarChart
                            width={700}
                            height={300}
                            data={[
                                {
                                  name: 'Attacking Power',
                                  Fifa2017: this.state.selectedClubProgress.Attacking_power_17,
                                  Fifa2022: this.state.selectedClubProgress.Attacking_power_22,
                                  amt: 100,
                                },
                                {
                                    name: 'Defensive Power',
                                    Fifa2017: this.state.selectedClubProgress.Defensive_Power_17,
                                    Fifa2022: this.state.selectedClubProgress.Defensive_Power_17,
                                    amt: 100,
                                },
                                {
                                    name: 'Normalized Team Rating',
                                    Fifa2017: this.state.selectedClubOverall17.normalized_overall_rating,
                                    Fifa2022: this.state.selectedClubOverall22.normalized_overall_rating,
                                    amt: 100,
                                },
                              ]}
                            margin={{
                              top: 5,
                              right: 0,
                              left: 175,
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
                          </BarChart>
                        </CardBody>
                    </Card>
                </div> : <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='left' justify='center'>
                            <h3> No Club Stats Found. </h3>
                            </Row>
                        </CardBody>
                    </Card> }
                </div> : null}


      </div>
    )
  }

}

export default HomePage

