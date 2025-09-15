import React from 'react';
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Divider,
} from 'antd'
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import MenuBar from '../components/MenuBar';

import { getAllNations, getNationPlayers, getNationProgress, getNationOverall17, getNationOverall22 } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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

const nationColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, row) => <a href={`/nationalteams?id=${row.name}`}>{text}</a>
  },
  {
    title: 'Flag',
    dataIndex: 'flag',
    render: (text, row) => <img src={row.flag} referrerPolicy="no-referrer" alt={null} style={{height:'5vh'}}/>
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nationsResults: [],
      nationsPageNumber: 1,
      nationsPageSize: 10,
      pagination: null,
      loggedIn: false,
      selectedNation: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
      selectedNationPlayers: [],
      selectedNationProgress: null,
      selectedNationOverall17: null,
      selectedNationOverall22: null,
    }
  }
  
  componentDidMount() {
    getAllNations().then(res => {
      this.setState({ nationsResults: res.results })
    })

    getNationPlayers(this.state.selectedNation).then(res => {
      this.setState({ selectedNationPlayers: res.results })
    })

    getNationOverall17(this.state.selectedNation).then(res => {
        this.setState({ selectedNationOverall17: res.results[0] })
        console.log(this.state.selectedNationOverall17)
    })

    getNationOverall22(this.state.selectedNation).then(res => {
        this.setState({ selectedNationOverall22: res.results[0] })
        console.log(this.state.selectedNationOverall22)
    })

    getNationProgress(this.state.selectedNation).then(res => {
        this.setState({ selectedNationProgress: res.results[0] })
    })
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Nations</h3>
          <Table dataSource={this.state.nationsResults} columns={nationColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
            {this.state.selectedNation ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <h3>{decodeURI(this.state.selectedNation)}</h3>
            <h5> Players from {decodeURI(this.state.selectedNation)}: </h5>
            <Table dataSource={this.state.selectedNationPlayers} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            { this.state.selectedNationProgress !== null && this.state.selectedNationProgress.Attacking_power_17 !== null ? <div>
                <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <h3> Nation Stats for {decodeURI(this.state.selectedNation)}: </h3>
                            <Row gutter='30' align='left' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Attacking Power in 2017: {this.state.selectedNationProgress.Attacking_power_17}</h6>
                            <h6>Defensive Power in 2017: {this.state.selectedNationProgress.Defensive_Power_17}</h6>
                            <h6>Normalized Team Rating in 2017: {this.state.selectedNationOverall17.normalized_overall_rating}</h6>
                            </Col>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Attacking Power in 2022: {this.state.selectedNationProgress.Attacking_power_22}</h6>
                            <h6>Defensive Power in 2022: {this.state.selectedNationProgress.Defensive_Power_22}</h6>
                            <h6>Normalized Team Rating in 2022: {this.state.selectedNationOverall22.normalized_overall_rating}</h6>
                            </Col>
                            </Row>
                            <Divider />
                            <BarChart
                            width={700}
                            height={300}
                            data={[
                                {
                                  name: 'Attacking Power',
                                  Fifa2017: this.state.selectedNationProgress.Attacking_power_17,
                                  Fifa2022: this.state.selectedNationProgress.Attacking_power_22,
                                  amt: 100,
                                },
                                {
                                    name: 'Defensive Power',
                                    Fifa2017: this.state.selectedNationProgress.Defensive_Power_17,
                                    Fifa2022: this.state.selectedNationProgress.Defensive_Power_17,
                                    amt: 100,
                                },
                                {
                                    name: 'Normalized Team Rating',
                                    Fifa2017: this.state.selectedNationOverall17.normalized_overall_rating,
                                    Fifa2022: this.state.selectedNationOverall22.normalized_overall_rating,
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
                            <h3> No Nation Stats Found. </h3>
                            </Row>
                        </CardBody>
                    </Card> }
                </div> : null}
      </div>
      
    )
  }

}

export default HomePage

