import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import MenuBar2 from '../components/MenuBar2';

import { getAllMatches, getAllPlayers, getLoginStatus, getUserFavorites } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const favoritePlayerColumns = [
  {
    title: 'Name',
    dataIndex: 'favoritesName',
    key: 'favoritesName',
    sorter: (a, b) => a.favoritesName.localeCompare(b.favoritesName),
    render: (text, row) => <a href={`/players?id=${row.favoritesID}`}>{text}</a>
  },
];

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
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'Potential',
    dataIndex: 'Potential',
    key: 'Potential',
    sorter: (a, b) => a.Potential - b.Potential
  },
  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  {
    title: 'Club',
    dataIndex: 'Club',
    key: 'Club',
    sorter: (a, b) => a.Club.localeCompare(b.Club)
  },
  // TASK 9: add a column for Value - no sorting required
  {
    title: 'Value',
    dataIndex: 'Value',
    key: 'Value',
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      favoritedPlayers: [],
      pagination: null,
      username: '',
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  leagueOnChange(value) {
    getAllMatches(null, null, value).then(res => {
      this.setState({ matchesResults: res.results })
    })
  }

  componentDidMount() {
    getLoginStatus().then(res => {
      if (res === 'user not logged in') {
      } else {
          this.setState({ username: res })
          getUserFavorites(this.state.username).then(res => {
              this.setState({ favoritedPlayers: res })
          })
      }
    })
    getAllPlayers().then(res => {
      this.setState({ playersResults: res.results })
    })
  }


  render() {

    return (
      <div>
        <MenuBar />
        {this.state.username !== '' ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Favorited Players</h3>
          <Table dataSource={this.state.favoritedPlayers} columns={favoritePlayerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div> : null}
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Players</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns}/>
        </div>
        


      </div>
    )
  }

}

export default HomePage

