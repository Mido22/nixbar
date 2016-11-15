// @flow
import React, { Component } from 'react';
import {  NavPane, NavPaneItem, Text } from 'react-desktop/windows';
import {log, loge, getImageLocation} from '../../utils/common';
import {get} from '../../api/db';
import MainWindow from './MainWindow';


export default class LibraryPane extends Component {
  static defaultProps = {
    theme: 'light'
  };

  constructor() {
    super();
    this.state = {selectedPlatform:0, platforms: []};
  }

  componentDidMount() {
    get('systemconfig', {Active:1}).then(platforms => this.setState({platforms})).catch(loge);
  }

  render() {
    const navItems = this.state.platforms.map(this.renderNavItem.bind(this));
    return (
      <NavPane openLength={200} push color={this.props.color} theme={this.props.theme}>
        {navItems}
      </NavPane>
    );
  }

  renderNavItem(item, index) {
    return (
      <NavPaneItem
        key={index}
        title={item.SystemHuman}
        icon={this.renderIcon(item)}
        theme="light"
        selected={this.state.selectedPlatform === index}
        onSelect={() => this.setState({ selectedPlatform: index })}
        padding="10px 20px"
        push
      >
        <MainWindow parent={item.System}/>
      </NavPaneItem>
    );
  }

  renderIcon(item) {
    return (
      <img src={getImageLocation('platform', item)} width="32px" height="31px" />
    );
  }
}
