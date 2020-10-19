import React from "react";
import styled from "styled-components";

const MessageItem = styled.li`
  display: flex;
  flex-direction: column;
  align-self: ${({ right }) => (right ? "flex-end" : "flex-start")};
  max-width: 80%;
  word-wrap: break-word;
  margin: 0.3rem;
`;
const Img = styled.img`
  max-width: 100%;
  max-height: 200px;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
`;
const Text = styled.span`
  padding: 0.2rem;
  background-color: ${({ theme }) => theme.subBody};
  border: 0.5px solid ${({ theme }) => theme.color};
  border-radius: 0.5rem;
`;
const Author = styled.span`
  text-align: left;
`;
const CreatedAt = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color}aa;
  font-weight: 300;
`;

const Message = ({ message, username }) => {
  const sameUser = username === message.username;
  return (
    <MessageItem right={sameUser}>
      {!sameUser && <Author>{message.username}</Author>}
      {message.img && <Img src={message.img} alt="added content" />}
      {message.body && <Text className="message-body">{message.body}</Text>}
      <CreatedAt>{message.createdat}</CreatedAt>
    </MessageItem>
  );
};

export default Message;
