import React, { useEffect, useState } from 'react';
import './App.css';

import { socket, HOST } from './service/socket';
import MessagesWindow from './components/MessagesWindow/MessagesWindow';
import NewMessageField from './components/NewMessageField/NewMessageField';
import UsernameField from './components/UsernameField/UsernameField';

import { useUsername } from './hooks/hooks';

function App() {

  const username = useUsername();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');

  useEffect(() => {
    
    socket.on('message added', (msg)=> {
      setMessages(messages => [...messages, msg])
      scrollToBottom();
    })

    socket.on('message fail', (err)=> setErrorMessages(err))

    return () => {
      socket.off('message added')
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
    <div className="App">
      <UsernameField username={username}/>
      <MessagesWindow username={username.value} messages={messages} loading={loadingMessages} error={errorMessages} />
      <NewMessageField username={username.value}/>
    </div>
  );
}

export default App;

function scrollToBottom() {
  window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
} 