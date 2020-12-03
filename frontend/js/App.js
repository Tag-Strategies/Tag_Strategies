import React from 'react';
import { hot } from 'react-hot-loader/root';
import Fec from './app/example-app/components/FecComponent/Fec';

import Home from './pages/Home';
import SentryBoundary from './utils/SentryBoundary';

const App = () => (
  <SentryBoundary>
    <Fec />
  </SentryBoundary>
);


export default hot(App);
