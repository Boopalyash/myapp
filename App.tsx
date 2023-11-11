import React from 'react';
import ApplicationNavigation from './app/routes/ApplicationNavigation';
import {Provider} from 'react-redux';
import {store} from './app/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigation />
    </Provider>
  );
};
export default App;
