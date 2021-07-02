import React from 'react';
import Map from './components/Map';
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App(props) {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

export default App;