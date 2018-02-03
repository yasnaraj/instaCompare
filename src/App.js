import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InstaTags from './containers/instaTags';
import TagsCompare from './containers/tagsCompare';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><i className="fa fa-instagram"></i> #instaCompare </h1>
        </header>

        <TagsCompare />
      </div>
    );
  }
}

export default App;
