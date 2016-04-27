import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './containers/App.jsx';
import IndexPage from './containers/IndexPage.jsx';
import AboutPage from './containers/AboutPage.jsx';
import AboutTeamPage from './containers/AboutTeamPage.jsx';
import AboutProductPage from './containers/AboutProductPage.jsx';
import ContactPage from './containers/ContactPage.jsx';
import NotFoundPage from './components/NotFoundPage';

import ScoreCollection from './resources/scores/Collection.jsx';
import ScoreCollectionIndex from './resources/scores/collection/Index.jsx';
import ScoreCollectionStats from './resources/scores/collection/Statistics.jsx';

export default (
  <Route path="/" component={App}>
    <Route name="index" path="/" component={IndexPage} />
    <Route path="scores" component={ScoreCollection}>
      <IndexRoute component={ScoreCollectionIndex} />
      <Route path="stats" component={ScoreCollectionStats} />
    </Route>
    {/*
    <Route name="about" path="about" component={AboutPage}>
      <IndexRedirect to="product" />
      <Route name="team" path="team" component={AboutTeamPage} />
      <Route name="product" path="product" component={AboutProductPage} />
    </Route>
    */}
    <Route name="contact" path="contact" component={ContactPage} />
    <Route name="notfound" path="*" component={NotFoundPage} />
  </Route>
);
