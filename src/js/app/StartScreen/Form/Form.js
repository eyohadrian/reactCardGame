import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Form extends Component {

  get VISIBILITY_CLASS_NAME() {
    return "visible";
  }

  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      visible: false
    };

    this.showOnTimeout();
  }

  showOnTimeout = () => {
    setTimeout(this.visible, 800);
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

  visible = () => {
    this.changeVisibility(true);
  }

  invisible = () => {
    this.changeVisibility(false);
  }

  changeVisibility = (boolean) => {
    this.setState({
      visible: boolean
    })
  }

  conditionalClassAppend = () => {
    return this.state.visible ? this.VISIBILITY_CLASS_NAME : "";
  }

  render() {
    return (
      <form className={"Form element " + this.conditionalClassAppend()} onSubmit={this.prevent}>
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
