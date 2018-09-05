import React from 'react';
import './loading-screen.scss'

export default class LoadingScreen extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LoadingScreen" onAnimationEnd={() => this.props.onHidden()}>
        <p>Loading</p>
      </div>
    )
  }
}
