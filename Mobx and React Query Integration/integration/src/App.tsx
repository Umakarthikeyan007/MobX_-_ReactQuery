import {observer} from "mobx-react";
import Router from "./route/Router";
import './App.css';
function App() {
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default observer(App);
