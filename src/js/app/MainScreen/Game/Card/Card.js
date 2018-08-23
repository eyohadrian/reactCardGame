import React from 'react';
import './card.scss';
import {Face} from './Face/Face'
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    if(!this.props.freezed) {
      const card = {
        id: this.props.image.id,
        number: this.props.image.number
      }
      this.props.faceCard(card);
    }
  }

  render() {

    let content = this.props.faceUp ? this.props.image.url : "";

    return (
      <div className="Card"
        onClick = {this.onClick}>
          {this.props.faceUp && <Face url={this.props.image.url}/>}
      </div>
    )
  }
}

export default Card;
