import React, { useState } from 'react';
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
  const [channelsToggle, setChannelsToggle] = useState(false)

  const switchChannelsToggle = () => {
    setChannelsToggle(toggle => !toggle)
    console.log(channelsToggle)
  }

  return (
    <Router>
      <div className="App">
        <UsernameField username={username} switchChannelsToggle={switchChannelsToggle} />
        <div className='central-view'>
          <Chanels toggle={channelsToggle} switchChannelsToggle={switchChannelsToggle} />
          <section className={`messages ${channelsToggle && 'messages-hidden'}`}>
            <Switch>
              <Route path='/:channel'>
                <MessagesWindow username={username.value} />
              </Route>
            </Switch>
            <NewMessageField username={username.value}/>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;