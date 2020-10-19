import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { socket } from "../../service/socket";
import LoadMoreMessagesButton from "../LoadMoreMessagesButton/LoadMoreMessagesButton";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  height: 100%;
  overflow: auto;

  @media (max-width: 600px) {
    margin: 3.5rem 0 4rem;
  }
`;
const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 600px) {
    height: 100%;
  }
`;
const MessagesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: 100%;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const MessagesWindow = ({ username }) => {
  const { channel } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.emit("load messages", { count: 0, channel });
    setLoading(true);

    return setMessages([]);
  }, [channel]);

  const addLoadedMessages = (newMessages) => {
    setMessages((messages) => [...newMessages, ...messages]);
    setLoading(false);
    scrollToBottom();
  };

  const addMessage = (message) => {
    if (channel !== message.channel) return;
    setMessages((messages) => [...messages, message]);
    scrollToBottom();
  };

  const addError = (err) => {
    setError(err);
    setLoading(false);
  };

  useEffect(() => {
    socket.on("messages loaded", addLoadedMessages);

    socket.on("message added", addMessage);

    socket.on("load messages fail", addError);

    return () => {
      socket.off("messages loaded", addLoadedMessages);
      socket.off("message added", addMessage);
      socket.off("load messages fail", addError);
    };
  }, [channel]);

  return (
    <Section>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{(error === "No such channel" && <Redirect to="/" />) || error}</p>
      ) : (
        <MessagesContainer>
          {messages.length !== 0 && (
            <LoadMoreMessagesButton count={messages.length} channel={channel} />
          )}
          {messages.length ? (
            <MessagesList id="messages-list">
              {messages.map((msg, i) => (
                <Message username={username} message={msg} key={i} />
              ))}
            </MessagesList>
          ) : (
            "No messages yet!"
          )}
        </MessagesContainer>
      )}
    </Section>
  );
};

export default MessagesWindow;

function scrollToBottom() {
  const messagesList = document.querySelector("#messages-list");
  if (Boolean(messagesList)) {
    messagesList.scrollTo({
      top: messagesList.scrollHeight,
      behavior: "smooth",
    });
  }
}
