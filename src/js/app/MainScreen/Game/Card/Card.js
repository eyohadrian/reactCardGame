import React from 'react';
import './card.scss';
import Face from './Face';

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
    return (
      <span className="Card"
        onClick = {this.onClick}
      >
        {this.props.faceUp && <Face src={this.props.image.url}/>}
      </span>
    )
  }
}

export default Card;
