import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import ApplicationOutlet from './application/pages/Outlet.jsx';
import ContactPage from './application/pages/Contact.jsx';
import ParticipantsPage from './application/pages/Participants.jsx';
// import IndexPage from './containers/IndexPage.jsx';
// import AboutPage from './containers/AboutPage.jsx';
// import AboutTeamPage from './containers/AboutTeamPage.jsx';
// import AboutProductPage from './containers/AboutProductPage.jsx';
import NotFoundPage from './components/NotFoundPage';


export default (
  <Route path="/" component={ApplicationOutlet}>
    {/*
    <Route name="index" path="/" component={IndexPage} />
    <Route path="scores" component={ScoreCollectionOutletResource}>
      <IndexRoute component={ScoreCollectionIndex} />
      <Route path="stats" component={ScoreCollectionStatsResource} />
    </Route>
    <Route path="participants" component={ParticipantCollectionOutletResource}>
      <IndexRoute component={ParticipantCollectionIndex} />
    </Route>
    */}
    {/*
    <Route name="about" path="about" component={AboutPage}>
      <IndexRedirect to="product" />
      <Route name="team" path="team" component={AboutTeamPage} />
      <Route name="product" path="product" component={AboutProductPage} />
    </Route>
    */}
    <Route name="participants" path="participants" component={ParticipantsPage} />
    <Route name="contact" path="contact" component={ContactPage} />
    <Route name="notfound" path="*" component={NotFoundPage} />
  </Route>
);
