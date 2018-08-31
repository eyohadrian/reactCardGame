 import React from 'react';
import Card from './Card/Card';
import YouWin from './YouWin/YouWin';
import './game.scss';
import LoadingScreen from './LoadingScreen/LoadingScreen';

class Game extends React.Component {

  state = {
    card_faced: false,
    cards_faced: [],
    cards_completed: [],
    all_faced_up: true,
    is_freeze: true,
    cards_loaded_count: 0,
    all_cards_loaded: false,
    loadingScreenHidden: false
  }

  constructor(props) {
    super(props);
    this.images = props.images;
    this.start_time =  new Date();
    this.state = this.state;
  }

  allFacedDownWithDelay = () => {
    console.log("time starts");
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
    this.allFacedDownWithDelay();
  }

  onCardLoaded = () => {
    this.cardLoadedCountPlusOne();
    const condition = this.state.cards_loaded_count == 9;

    if (condition === true) {
      this.onAllCardsLoaded();
    }
  }

  onLoadingScreenHidden = () => {
    //this.setState((state) => ({loadingScreenHidden: true}));
  }

  onAllCardsLoaded = async () => {
    this.setState((state) => ({all_cards_loaded: true}));
    const otherMsg = await this.allFacedDownWithDelay();
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

  shouldCardBeFaced = (i) => {
    if (this.isCardInCardsFaced(i.id) || this.isCardInCardsCompleted(i.id)) {
      return true;
    } else {
      return this.state.all_faced_up;
    }
    return condition;
  }

  shouldLoadingScreenBeenDisplayed = () => {
    return this.state.loadingScreenHidden;
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
      <div className="Game">
        {!this.shouldLoadingScreenBeenDisplayed() &&
          <LoadingScreen
            hide = {this.state.all_cards_loaded}
            onHidden = {this.onLoadingScreenHidden()}
          />
        }
        {this.loadImages()}
        {this.end()}
      </div>
    )
  }

}

export default Game;
