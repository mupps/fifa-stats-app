import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';

import { getAllFlops } from '../fetcher'
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
    title: 'Potential',
    dataIndex: 'Potential',
    key: 'Potential',
    sorter: (a, b) => a.Potential - b.Potential
  },
  {
    title: 'FIFA 17 Rating',
    dataIndex: 'fifa17_rating',
    key: 'fifa17_rating',
    sorter: (a, b) => a.fifa17_rating.localeCompare(b.fifa17_rating)
  },
  {
    title: 'FIFA 22 Rating',
    dataIndex: 'fifa22_rating',
    key: 'fifa22_rating',
    sorter: (a, b) => a.fifa22_rating.localeCompare(b.fifa22_rating)
  },
  {
    title: 'Development',
    dataIndex: 'Development',
    key: 'Development',
    sorter: (a, b) => a.Development - b.Development
  },
];

class FlopsPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playersResults: [],
      pagination: null,
      loggedIn: false
    }
  }

  componentDidMount() {
    getAllFlops().then(res => {
      this.setState({ playersResults: res.results })
      console.log(this.state.playersResults)
    })
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Top 20 Flops from FIFA 17 to FIFA 22</h3>
          <h5>A list of the top players with high potential in 2017 who did not meet their expectations!</h5>
          <Table dataSource={this.state.playersResults} columns={playerColumns}/>
        </div>


      </div>
    )
  }

}

export default FlopsPage

