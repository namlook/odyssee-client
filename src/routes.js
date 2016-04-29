import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import ApplicationOutlet from './application/pages/Outlet.jsx';
import ApplicationContact from './application/pages/Contact.jsx';
// import IndexPage from './containers/IndexPage.jsx';
// import AboutPage from './containers/AboutPage.jsx';
// import AboutTeamPage from './containers/AboutTeamPage.jsx';
// import AboutProductPage from './containers/AboutProductPage.jsx';
import NotFoundPage from './components/NotFoundPage';

// import ScoreCollectionOutlet from './resources/scores/collection/Outlet.jsx';
// import ScoreCollectionIndex from './resources/scores/collection/Index.jsx';
// import ScoreCollectionStats from './resources/scores/collection/Statistics.jsx';
// import ParticipantCollectionIndex from './resources/participants/collection/Index.jsx';
// import ParticipantCollectionOutlet from './resources/participants/collection/Outlet.jsx';

// import { connect } from 'react-redux';

// import { bindActionCreators } from 'redux';
// const actions = {};
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actions, dispatch),
// });

// const ScoreCollectionOutletResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.resources.scores.collection.outlet,
//       resource: state.resources.scores,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ScoreCollectionOutlet);
//
// const ScoreCollectionStatsResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.resources.scores.collection.statistics,
//       resource: state.resources.scores,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ScoreCollectionStats);
//
// const ParticipantCollectionOutletResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.resources.participants.collection.outlet,
//       resource: state.resources.participants,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ParticipantCollectionOutlet);
//
// const ParticipantCollectionIndexResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.resources.participants.collection.statistics,
//       resource: state.resources.participants,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ParticipantCollectionIndex);
//
// const ApplicationOutletResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.application.outlet,
//       resource: state.application,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ApplicationOutlet);
//
// const ApplicationContactResource = connect(
//   (state) => ({
//     storeStates: {
//       page: state.application.contact,
//       resource: state.application,
//       app: state,
//     },
//   }),
//   mapDispatchToProps
// )(ApplicationContact);

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
    <Route name="contact" path="contact" component={ApplicationContact} />
    <Route name="notfound" path="*" component={NotFoundPage} />
  </Route>
);
