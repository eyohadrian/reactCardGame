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
      is_freeze: true,
      cards_loaded_count: 0,
      all_cards_loaded: false
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.onLoadingScreenHidden === true) {
      this.allFacedDownWithDelay();
    }
  }

  allFacedDownWithDelay = () => {
    return new Promise(res => {
      setTimeout(() => {
        this.setState({all_faced_up: false, cards_faced: [], is_freeze:false});
        res("Done");
      }, 1000);
    });
  }

  onFirstCardFaced = (card) => {
    this.setState({
      card_faced: true,
      cards_faced: this.state.cards_faced.concat(card)
    })
  }

  onSecondCardFaced = (card) => {
    const cardsMatches = this.state.cards_faced[0].number == card.number;
    if(cardsMatches) {
      this.onCardMatch(card);
    } else {
      this.onCardNotMatch(card);
    }
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
    Promise.resolve(this.allFacedDownWithDelay());
  }

  onCardLoaded = () => {
    this.cardLoadedCountPlusOne();
    const condition = this.state.cards_loaded_count == 9;

    if (condition === true) {
      this.onAllCardsLoaded();
    }
  }

// USELESS BY THE MOMENT
  onAllCardsLoaded = async () => {
    this.setState((state) => ({all_cards_loaded: true}));
    //await this.allFacedDownWithDelay();
  }

  cardLoadedCountPlusOne = () => {
    this.setState((state) => ({cards_loaded_count: state.cards_loaded_count + 1}))
  }

  faceCard = (card) => {
    const isSameCard = this.isCardInCardsFaced(card.id);
    if (!isSameCard) {
      this.faceCardOnNotSameCard(card);
    }
  }

  faceCardOnNotSameCard = (card) => {
    const isAnyCardFaced = this.state.card_faced;
    if(!isAnyCardFaced) {
      this.onFirstCardFaced(card);
    } else {
      this.onSecondCardFaced(card);
    }
  }

  shouldCardBeFaced = (i) => {
    if (this.isCardInCardsFaced(i.id) || this.isCardInCardsCompleted(i.id)) {
      return true;
    } else {
      return this.state.all_faced_up;
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

  loadImages = () => {
    return (this.images.map(i => {
        const faced = this.shouldCardBeFaced(i);
        return <Card
          image = {i}
          faceCard = {this.faceCard}
          onCardLoaded = {this.onCardLoaded}
          key = {i.id}
          faceUp = {faced}
          freezed = {this.state.is_freeze}
        />
      }
    ))
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
      <div className="Game">
        {this.loadImages()}
        {this.end()}
      </div>
    )
  }

}

export default Game;
