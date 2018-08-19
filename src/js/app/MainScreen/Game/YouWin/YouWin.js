import React from 'react';
import { NavLink } from "react-router-dom";
import './youWin.scss';

class YouWin extends React.Component {
  render() {
    return (
      <div className="YouWin page">
        <div className="element">
          <h2 className="title">You Win!</h2>
          <button>
            <NavLink to="/summary">Continue</NavLink>
          </button>
        </div>
      </div>
    )
  }
}

export default YouWin
