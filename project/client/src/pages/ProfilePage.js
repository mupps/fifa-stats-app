import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';

import { getUserFavorites, getLoginStatus } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const playerColumns = [
  {
    title: 'Name',
    dataIndex: 'favoritesName',
    key: 'favoritesName',
    sorter: (a, b) => a.favoritesName.localeCompare(b.favoritesName),
    render: (text, row) => <a href={`/players?id=${row.favoritesID}`}>{text}</a>
  },
];

class ProfilePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playersResults: [],
      username: ''
    }
  }

  componentDidMount() {
    
    getLoginStatus().then(res => {
        if (res === 'user not logged in') {
        } else {
            this.setState({ username: res })
            getUserFavorites(this.state.username).then(res => {
                this.setState({ playersResults: res })
            })
        }
    })
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Favorited Players</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns}/>
        </div>


      </div>
    )
  }

}

export default ProfilePage

