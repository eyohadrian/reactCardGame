import React, { Component } from 'react';
import StartScreen from './StartScreen/StartScreen';
import MainScreen from './MainScreen/MainScreen';
import SummaryScreen from './SummaryScreen/SummaryScreen';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.time = "";
    this.state = {
      keyword: ""
    };
  }

  setState = (keyword) => {
    this.state.keyword = keyword;
  }
  setTime = (time) => {
    this.time = time;
  }
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route
            exact path="/"
            render = {(props) =>
              <StartScreen {...props} getKeyword = {this.setState}/>
            }
          />
          <Route
            path="/game"
            render = {(props) =>
              <MainScreen {...props}
              keyword = {this.state.keyword}
              end = {this.setTime}/>
            }
          />
          <Route
            path="/summary"
            render = {(props) =>
              <SummaryScreen {...props} time={this.time}/>
            }
          />
        </div>
      </HashRouter>
    )
  }
}


export default App
