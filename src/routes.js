import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './containers/App.jsx';
import IndexPage from './containers/IndexPage.jsx';
import AboutPage from './containers/AboutPage.jsx';
import AboutTeamPage from './containers/AboutTeamPage.jsx';
import AboutProductPage from './containers/AboutProductPage.jsx';
import ContactPage from './containers/ContactPage.jsx';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route component={App}>
    <Route path="/" component={IndexPage} />
    <Route path="about" component={AboutPage}>
      <IndexRedirect to="product" />
      <Route path="team" component={AboutTeamPage} />
      <Route path="product" component={AboutProductPage} />
    </Route>
    <Route path="contact" component={ContactPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
