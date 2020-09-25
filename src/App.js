import React from 'react';
import './App.css';
import MasterView from './app/components/MasterView';
// import Loader from './app/components/Loader';
import {Provider} from 'react-redux';
import {store} from './app/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <MasterView />
      </div>
    </Provider>
  );
}

export default App;
