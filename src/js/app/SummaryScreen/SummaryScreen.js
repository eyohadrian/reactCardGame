import React from 'react';
import { NavLink } from 'react-router-dom';
import { formattedTime } from './../Utilities'

class SummaryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.time = new Date(this.props.time);
  }

  getMil = (d) => {return d / 1000}
  render() {
    return (
      <div class="SummaryScreen page">
        <div class="element">
          <h2 class="title">{formattedTime(this.time)}</h2>
          <div class="content">
            <p>Congratulations!</p>
          </div>
          <button type='button'>
            <NavLink to="/">Play Again</NavLink>
          </button>
        </div>
      </div>
    )
  }

}

export default SummaryScreen;
