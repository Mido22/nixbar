// @flow
import React, { Component } from 'react';
import { Window, TitleBar, SegmentedControl, SegmentedControlItem, Text } from 'react-desktop/macOs';
import { Link } from 'react-router';
import './Home.css';
import io from 'socket.io-client';
import LibraryPane from './LibraryPane';

const socket = io('', { path: '/api/io' });

export default class Home extends Component {
  constructor(props: Object) {
    super(props);
    this.state = { selected: 1 };
  }

  state: {
    selected: number
  }

  renderItem(key: number, title: string, content) {
    return (
      <SegmentedControlItem
        key={key}
        title={title}
        selected={this.state.selected === key}
        onSelect={() => this.setState({ selected: key })}
      >
        {content}
      </SegmentedControlItem>
    );
  }

  renderItems() {
    return [
      this.renderItem(1, 'Library', <LibraryPane />),
      this.renderItem(2, 'Database', <Link to="/counter">to Counter</Link>),
      this.renderItem(3, 'Statistics', <Text>Statistics</Text>),
      this.renderItem(4, 'Dat Explorer', <Text>Dat Explorer</Text>),
      this.renderItem(5, 'About', <Text>About</Text>)
    ];
  }

  render() {
    return (
      <Window
        chrome
      >
        <TitleBar title="Nixbar 3000" controls />
        <SegmentedControl box>
          {this.renderItems()}
        </SegmentedControl>
      </Window>
    );
  }
}
