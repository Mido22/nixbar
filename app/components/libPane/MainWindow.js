// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import {  NavPane, NavPaneItem, Text } from 'react-desktop/macOs';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import {log, loge, getImageLocation } from '../../utils/common';
import {get} from '../../api/db';


const gameTable = [
  {header: 'Name', field: 'name'},
  {header: 'Desc', field: 'description'},
  {header: 'ROM NAME', field: 'romname'},
];

const tableLabels = gameTable.map(a => a.header);


export default class MainWindow extends Component {
  constructor() {
    super();
    this.state = {
      games:[],
      gameFilterStr: "",
      sortAscending: true,
      sortIndex: 0
    };
  }

  componentDidMount() {
    get(this.props.parent, {}).then(games => this.setState({games})).catch(loge);
  }

  render() {
    const gameItems = this.renderGameItems();
    return(
      <Table>
        <TableHeader labels={tableLabels}
           sortIndex={this.state.sortIndex}
           sortAscending={this.state.sortAscending}
           onSort={this.sortTable.bind(this)}
           scrollable={true}
           selectable={true}
         />
        <tbody>
          {gameItems}
        </tbody>
      </Table>
    );
  }

  sortTable(sortIndex, sortAscending)  {
    this.setState({sortIndex, sortAscending});
  }

  renderGameItems(){
    // let gameItems = this.state.games.filter(game => game.name && game.name.indexOf(this.gameFilterStr) > -1);
    let gameItems = this.state.games;
    gameItems = _.orderBy(gameItems, [gameTable[this.state.sortIndex]], [this.state.sortAscending? 'asc':'desc']);
    return gameItems.map(this.renderGameItem);
  }

  renderGameItem(item, index) {
    const rowData = gameTable.map((data, i) => <td key={i}>{item[data.field]}</td>);
    return (
    <TableRow key={index}>
      {rowData}
    </TableRow>
    );
  }
}
