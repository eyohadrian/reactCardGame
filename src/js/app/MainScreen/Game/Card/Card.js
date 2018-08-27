import React from 'react';
import './card.scss';

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
    let content;
    this.props.faceUp ? content = {content: `url(${this.props.image.url})`} : content = {};
    return (
      <span className="Card"
        style={content}
        onClick = {this.onClick}
        />
    )
  }
}

export default Card;
