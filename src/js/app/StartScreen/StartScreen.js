import React from 'react';
import Form from './Form/Form';

class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="StartScreen page">
        <Form
        callback={this.props.getKeyword}/>
      </div>
    )
  }
}

export default StartScreen;
