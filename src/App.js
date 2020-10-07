import React, { useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { socket, HOST } from './service/socket';
import MessagesWindow from './components/MessagesWindow/MessagesWindow';
import NewMessageField from './components/NewMessageField/NewMessageField';
import UsernameField from './components/UsernameField/UsernameField';

import { useUsername } from './hooks/hooks';
import Chanels from './components/Chanels/Chanels';

function App() {

  const username = useUsername();
  const [messages, setMessages] = useState({});
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  useEffect(() => {

    socket.on('channel added', channel => setMessages(messages => Object.assign({}, messages, {[channel]: []})))
    
    socket.on('message added', ([channel, body])=> {
      setMessages(messages => Object.assign({}, messages, {[channel]: [...messages[channel], body]}))
      scrollToBottom();
    })

    socket.on('message fail', err => setErrorMessages(err))
    socket.on('error chanel', err => console.log(err))

    return () => {
      socket.disconnect()
    }

  }, [])

  useEffect(() => {
      setLoadingMessages(true)
      fetch(`${HOST}/get-messages`)
      .then(response => {
          if (!response.ok) return Promise.reject('Unable to get messages')
          return response.json()
      })
      .then(messages => setMessages(messages))
      .catch(err => setErrorMessages(err.message))
      .finally(() => {
        setLoadingMessages(false)
        scrollToBottom()
      })
  },[])

  return (
    <Router>
      <div className="App">
        <UsernameField username={username}/>
        <Chanels chanels={Object.keys(messages)}/>
        <Switch>
          <Route path='/:channel'>
            <MessagesWindow username={username.value} messages={messages} loading={loadingMessages} error={errorMessages} />
          </Route>
        </Switch>
        {Object.keys(messages).length && <NewMessageField username={username.value}/>}
      </div>
    </Router>
  );
}

export default App;

function scrollToBottom() {
  const messagesList = document.querySelector('.messages-list');
  messagesList.scrollTo({top: messagesList.scrollHeight, behavior: 'smooth'});
} 