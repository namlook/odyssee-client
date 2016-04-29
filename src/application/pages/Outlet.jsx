
import React, { PropTypes } from 'react';

import ApplicationNavbarWidget from '../../core/components/widgets/ApplicationNavbarWidget.jsx';
import ApplicationMenuWidget from '../../core/components/widgets/ApplicationMenuWidget.jsx';
import MobileApplicationMenuWidget
  from '../../core/components/widgets/MobileApplicationMenuWidget.jsx';
import WidgetGrid from '../../core/components/WidgetGrid.jsx';
import Outlet from '../../core/components/Outlet.jsx';

export const App = (props) => {
  const items = [
    { label: 'Participants', route: '/participants', icon: 'users' },
    { label: 'Scores', route: '/scores', icon: 'game' },
    { label: 'Statistics', route: '/scores/stats', icon: 'chart line' },
    { label: 'Contact', route: '/contact', icon: 'user' },
  ];

  const currentLocationPath = props.location.pathname;

  return (
    <WidgetGrid>
      <ApplicationNavbarWidget appName="The Project" color="teal" />
      <ApplicationMenuWidget
        layout={{ mobile: 0, tablet: 0, computer: 3 }}
        currentPath={currentLocationPath}
        color="teal"
        items={items}
        />
      <Outlet layout={{ mobile: 16, tablet: 16, computer: 13 }}>
        {props.children}
      </Outlet>
      <MobileApplicationMenuWidget
        layout={{ mobile: 16, tablet: 16, computer: 0 }}
        color="teal"
        items={items} />
    </WidgetGrid>
  );
};

App.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default App;
