import React, { useEffect, useState } from 'react';



import MainView from './src/MainView';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/store/reducers';



const App: () => React$Node = () => {


  return (
    <Provider store={createStore(reducers)}>
      <MainView />
    </Provider>

  );
};



export default App;


