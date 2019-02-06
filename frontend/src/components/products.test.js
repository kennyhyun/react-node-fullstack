import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from "react-router-dom";

import Products from './products';
import store from '../store';

it('renders correctly', () => {
  const tree = renderer
    .create(<Provider store={store}>
      <Router>
      <Products />
      </Router>
      </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
