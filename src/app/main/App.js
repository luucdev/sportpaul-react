import React, { Component } from 'react';
import TeamDropdown from './TeamDropdown.js';
import TeamProducts from './TeamProducts.js';
import ProductCart from './ProductCart.js';

import TeamSamples from '../utils/teams.js';
import '../utils/NavLink.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    var cartContents = [];
    if(localStorage && localStorage.getItem('lastUpdate') && Date.now() - localStorage.getItem('lastUpdate') < 86400000 && localStorage.cart && localStorage.cart.length > 0) {
      cartContents = JSON.parse(localStorage.getItem('cart'));
    }
    this.state = {
      selectedTeam: "FC Steinhofen", // TODO: Vereins-Daten aus Datenbank
      cartContents: cartContents
    };

    this.onTeamSelect = this.onTeamSelect.bind(this);
    this.onProductAddToCart = this.onProductAddToCart.bind(this);
    this.onProductRemoveFromCart = this.onProductRemoveFromCart.bind(this);
  }

  onTeamSelect(teamName) {
    this.setState({selectedTeam: teamName});
  }

  onProductAddToCart(product, input) {
    var newContents = this.state.cartContents.slice();
    var cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      flockingPrice: product.flockingPrice,
      size: input.selectedSize,
      // flocking: input.flocking
    };
    newContents[this.state.cartContents.length] = cartProduct;
    this.setState({cartContents: newContents});
  }

  onProductRemoveFromCart(key) {
    var newContents = this.state.cartContents.slice();
    newContents.splice(key, 1);
    this.setState({cartContents: newContents});
  }

  componentWillUpdate(nextProps, nextState) {
    if(!localStorage || !nextState) return;
    if(nextState.cartContents && nextState.cartContents.length > 0) {
      localStorage.setItem('selectedTeam', nextState.selectedTeam);
      localStorage.setItem('cart', JSON.stringify(nextState.cartContents));
      localStorage.setItem('lastUpdate', Date.now());
    } else if(nextState.selectedTeam !== localStorage.getItem('selectedTeam')) {
      localStorage.setItem('selectedTeam', nextState.selectedTeam);
      localStorage.setItem('cart', JSON.stringify([]));
      localStorage.setItem('lastUpdate', Date.now());
    }
  }

  render() {
    this.cartTotal = 0;
    this.state.cartContents.forEach((el) => this.cartTotal += el.price);
    return (
      <div className="App">
        <TeamProducts productList={TeamSamples[this.state.selectedTeam] || []} onProductAddToCart={this.onProductAddToCart} />
      </div>
    );
    // <ProductCart contents={this.state.cartContents} total={this.cartTotal} onRemove={this.onProductRemoveFromCart} />
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};

export default App;
