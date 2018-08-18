import React from 'react';
import Game from './Game/Game';
import {randomBetween, formattedKeyword} from './../Utilities';

class MainScreen extends React.Component {

  get API_KEY() {
    return "5c902b45955a07ade0a24495f1972c8b4549ff10b50a3a52ebcc887f16ec11c2";
  }

  get N_CARDS() {
    return 5;
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.images = [];
    this.downloadImages(this.props.keyword);
  }

  downloadImages = async (keyword) => {
    this.images = await this.retrieveFromApi(keyword);
    this.duplicateImages();
    this.sortImagesByOrderAttr();
    this.setState({
      loading: false
    })
  }

  retrieveFromApi = async (keyword) => {
    const keywords = formattedKeyword(keyword);
    return fetch(`https://api.unsplash.com/search/photos/?client_id=${this.API_KEY}&query=${keywords}`)
      .then((res, err) => res.json())
      .then((data) => {
        data.results.length = this.N_CARDS;
        return data.results.map((v, i) => {
          return {
            id: v.id,
            url: v.urls.regular,
            number: i,
            order: randomBetween(1, 1000)}
        })
      });
  }

  sortImagesByOrderAttr = () => {
    this.images = this.images.sort((v, n) => {
      let order = 0;
      v.order > n.order ? order = 1: order = -1;
      return order;
    })
  }

  duplicateImages = () => {
    this.images.map(img =>
      this.images.push(
        {id: img.id + '_copy',
        url: img.url,
        number: img.number,
        order: randomBetween(1, 1000)
      }
    ));
  }

  render() {
    return (
      <div class="MainScreen" >
        {!this.state.loading &&
          <Game
            images = {this.images}
            end = {this.props.end}
          />
        }
      </div>
    )
  }
}


export default MainScreen;
