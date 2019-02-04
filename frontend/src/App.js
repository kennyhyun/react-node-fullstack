import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

const NavVar = () => <div>NavVar</div>;
const Products = () => <div>Products</div>;

class App extends Component {
  render() {
    return (
      <>
        <NavVar />
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/products" />} />
            <Route path="/products" component={Products}/>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
