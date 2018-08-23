 import React from 'react';
import Card from './Card/Card';
import YouWin from './YouWin/YouWin';
import './game.scss';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.images = props.images;
    this.start_time =  new Date();
    this.state = {
      thereIsCardFaced: false,
      cardsFaced: [],
      cardsCompleted: [],
      allFacedUp: true,
      isFreeze: true
    }
  }

  async componentDidMount() {
    this.allFacedDownWithDelay();
  }

  allFacedDownWithDelay = () => {
    setTimeout(() => {
      this.setState({allFacedUp: false, cardsFaced: [], isFreeze:false})
    }, 1000)
  }

  onFirstCardFaced = (card) => {
    this.setState({
      thereIsCardFaced: true,
      cardsFaced: this.state.cardsFaced.concat(card)
    })
  }

  onCardMatch = (card) => {
    this.setState({
      cardsFaced: [],
      cardsCompleted: this.state.cardsCompleted.concat(this.state.cardsFaced[0]).concat(card),
      isFreeze: false,
      thereIsCardFaced: false
    })
  }

  onCardNotMatch = (card) => {
    this.setState({
      thereIsCardFaced: false,
      cardsFaced: this.state.cardsFaced.concat(card),
      isFreeze: true
    })
    this.allFacedDownWithDelay();
  }

  onSecondCardFaced = (card) => {
    const cardsMatches = this.state.cardsFaced[0].number == card.number;
    if(cardsMatches) {
      this.onCardMatch(card);
    } else {
      this.onCardNotMatch(card);
    }
  }

  faceCard = (card) => {
    const isSameCard = this.isCardInCardsFaced(card.id);
    if (!isSameCard) {
      this.faceCardOnNotSameCard(card);
    }
  }

  faceCardOnNotSameCard = (card) => {
    const isAnyCardFaced = this.state.thereIsCardFaced;
    if(!isAnyCardFaced) {
      this.onFirstCardFaced(card);
    } else {
      this.onSecondCardFaced(card);
    }
  }

  loadImages = () => {
    return (this.images.map(i => {
        const faced = this.shouldCardBeFaced(i);
        return <Card
          image = {i}
          faceCard = {this.faceCard}
          key = {i.id}
          faceUp = {faced}
          freezed = {this.state.isFreeze}
        />
      }
    ))
  }

  shouldCardBeFaced = (i) => {
    let condition;
    if (this.isCardInCardsFaced(i.id) || this.isCardInCardsCompleted(i.id)) {
      condition = true;
    } else {
      condition = this.state.allFacedUp;
    }
    return condition;
  }

  isCardInCardsFaced = (cardId) => {
    return this.isCardInArray("cardsFaced", cardId);
  }

  isCardInCardsCompleted = (cardId) => {
    return this.isCardInArray("cardsCompleted", cardId);
  }

  isCardInArray = (whichOne, cardId) => {
    if(this.state[whichOne].length == 0) return false;

    return this.state[whichOne].map(c => {
      let condition;
      c.id == cardId ? condition = true: condition =  false
      return condition;
    }).reduce((i,d) => i || d);
  }

  end = () => {
    if (this.state.cardsCompleted.length >= 9) {
      const time = new Date() - this.start_time;
      this.props.end(time)
      return (
        <YouWin />
      )
    }
  }

  render() {
    return (
      <div className="Game">
        {this.loadImages()}
        {this.end()}
      </div>
    )
  }

}

export default Game;
