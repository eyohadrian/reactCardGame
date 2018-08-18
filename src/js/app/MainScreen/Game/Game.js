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
      card_faced: false,
      cards_faced: [],
      cards_completed: [],
      all_faced_up: true,
      is_freeze: true
    }
  }

  async componentDidMount() {
    this.allFacedDownWithDelay();
  }

  allFacedDownWithDelay = () => {
    setTimeout(() => {
      this.setState({all_faced_up: false, cards_faced: [], is_freeze:false})
    }, 1000)
  }

  onFirstCardFaced = (card) => {
    this.setState({
      card_faced: true,
      cards_faced: this.state.cards_faced.concat(card)
    })
  }

  onCardMatch = (card) => {
    this.setState({
      cards_faced: [],
      cards_completed: this.state.cards_completed.concat(this.state.cards_faced[0]).concat(card),
      is_freeze: false,
      card_faced: false
    })
  }

  onCardNotMatch = (card) => {
    this.setState({
      card_faced: false,
      cards_faced: this.state.cards_faced.concat(card),
      is_freeze: true
    })
    this.allFacedDownWithDelay();
  }

  onSecondCardFaced = (card) => {
    const cardsMatches = this.state.cards_faced[0].number == card.number;
    if(cardsMatches) {
      this.onCardMatch(card);
    } else {
      this.onCardNotMatch(card);
    }
  }

  faceCard = (card) => {
    const isAnyCardFaced = this.state.card_faced;
    if(!isAnyCardFaced) {
      this.onFirstCardFaced(card);
    } else {
      this.onSecondCardFaced(card);
    }
  }

  loadImages = () => {
    return (this.images.map(i => {
        const faced = this.shouldCardBeFaced(i);
        console.log(faced);
        return <Card
          image = {i}
          faceCard = {this.faceCard}
          faceUp = {faced}
          freezed = {this.state.is_freeze}
        />
      }
    ))
  }

  shouldCardBeFaced = (i) => {
    let condition;
    if (this.isCardInCardsFaced(i.id) || this.isCardInCardsCompleted(i.id)) {
      condition = true;
    } else {
      condition = this.state.all_faced_up;
    }
    return condition;
  }

  isCardInCardsFaced = (cardId) => {
    return this.isCardInArray("cards_faced", cardId);
  }

  isCardInCardsCompleted = (cardId) => {
    return this.isCardInArray("cards_completed", cardId);
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
    if (this.state.cards_completed.length >= 9) {
      const time = new Date() - this.start_time;
      this.props.end(time)
      return (
        <YouWin />
      )
    }
  }

  render() {
    return (
      <div class="Game">
        {this.loadImages()}
        {this.end()}
      </div>
    )
  }

}

export default Game;
