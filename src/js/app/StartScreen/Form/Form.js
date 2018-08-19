import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  handleKeywordChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  send = (e) => {
    this.props.callback(this.state.keyword);
    e.preventDefault();
  }

  prevent = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <form className="Form element" onSubmit={this.prevent}>
        <h2 className="title">Keywords</h2>
        <label htmlFor='keyword' className="content">
          <input name='keyword' onChange={this.handleKeywordChange} placeholder="Keyword" />
        </label>

        <button type='button' onClick={this.send}>
          <Link to="/game"><p>SEND</p></Link>
        </button>
      </form>
    );
  }
}

export default Form;
