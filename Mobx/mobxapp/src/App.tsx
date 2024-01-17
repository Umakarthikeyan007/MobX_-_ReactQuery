import React from 'react';
import { observer } from 'mobx-react';
import Router from './router';
function App() {
  return (
    <div className="App">
     <Router />
    </div>
  );
}

export default observer(App);
