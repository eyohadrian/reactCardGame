import React from 'react';
import './loading-screen.scss'

export default class LoadingScreen extends React.Component{

  state = {
    hide: false
  }

  constructor(props) {
    super(props);
    this.state = this.state;
  }

  render() {
    return (
      <div className="LoadingScreen" onAnimationEnd={() => {console.log("dale")}}>
        <p>Loading</p>
      </div>
    )
  }
}
