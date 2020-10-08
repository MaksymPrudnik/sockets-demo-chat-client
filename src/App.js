import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import MessagesWindow from './components/MessagesWindow/MessagesWindow';
import NewMessageField from './components/NewMessageField/NewMessageField';
import UsernameField from './components/UsernameField/UsernameField';

import { useUsername } from './hooks/hooks';
import Chanels from './components/Chanels/Chanels';

function App() {

  const username = useUsername();

  return (
    <Router>
      <div className="App">
        <UsernameField username={username}/>
        <Chanels />
        <Switch>
          <Route path='/:channel'>
            <MessagesWindow username={username.value} />
          </Route>
        </Switch>
        <NewMessageField username={username.value}/>
      </div>
    </Router>
  );
}

export default App;