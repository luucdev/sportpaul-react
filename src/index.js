import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './app/App';
import Checkout from './checkout/Checkout';

import Admin from './admin/Admin';
import Orders from './admin/orders/Orders';
import Settings from './admin/settings/Settings';

import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/checkout" component={Checkout}></Route>
    <Route path="/admin" component={Admin}>
      <Route path="/admin/orders" component={Orders}></Route>
      <Route path="/admin/settings" component={Settings}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
