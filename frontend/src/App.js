import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { Products } from './components';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/products" />} />
            <Route path="/products" component={Products}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
