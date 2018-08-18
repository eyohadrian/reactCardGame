import React from 'react';
import { NavLink } from "react-router-dom";
import './youWin.scss';

class YouWin extends React.Component {
  render() {
    return (
      <div class="YouWin page">
        <div class="element">
          <h2 class="title">You Win!</h2>
          <button>
            <NavLink to="/summary">Continue</NavLink>
          </button>
        </div>
      </div>
    )
  }
}

export default YouWin
