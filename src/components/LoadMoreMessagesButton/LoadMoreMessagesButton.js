import React from "react";
import { socket } from "../../service/socket";
import styled from "styled-components";

const LoadMoreButton = styled.button`
  border: none;
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  text-decoration: underline;
`;

const LoadMoreMessagesButton = ({ count, channel }) => {
  const handleLoadMore = () => {
    socket.emit("load messages", { count, channel });
  };
  return <LoadMoreButton onClick={handleLoadMore}>Load more</LoadMoreButton>;
};

export default LoadMoreMessagesButton;
