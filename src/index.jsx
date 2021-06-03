import React from 'react';
import { render } from 'react-dom';
import './style.css';

import Mapa from './Mapa';

const App = () => {
  return (
    <>
      <h1>Mapy</h1>
      <Mapa />
    </>
  );
}

render(<App />, document.querySelector('#app'));
