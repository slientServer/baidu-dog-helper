import React from 'react';
import {Router, Route, IndexRoute } from 'react-router';

import App from './containers/App';
import ItemList from './components/ItemList';
import Configurations from './components/Configurations';
import AutoRequest from './components/AutoRequest';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={ App }>
      <IndexRoute component={Configurations}/>
      <Route path='list' component={ItemList}/>
      <Route path='autorequest' component={AutoRequest}/>
    </Route>
  </Router>
);

export default Routes;