import React, { useState } from "react";
import { socket } from "../../service/socket";
import styled from "styled-components";

const AddChannelDiv = styled.div`
  display: flex;
  margin: 0.5rem 1rem 0;
`;
const ChannelName = styled.input`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.color};
  padding: 0.3rem 0.5rem;
  border: 1.5px solid ${({ theme }) => theme.color};
  border-top-left-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;
`;
const AddButton = styled.button`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.color};
  font-weight: 500;
  text-transform: uppercase;
  border: 1.5px solid ${({ theme }) => theme.color};
  border-top-right-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;
`;

const AddChannelButton = () => {
  const [channelName, setChannelName] = useState("");
  const handleNameChange = (e) => {
    setChannelName(e.target.value);
  };
  const handleAddChannel = () => {
    if (!channelName) return;
    socket.emit("new channel", channelName.replace(" ", "-"));
    setChannelName("");
  };
  const handleCheckChars = (e) => {
    const allowedChars = /[0-9a-zA-Z\ ]/;
    if (!allowedChars.test(e.data) || (!channelName.length && e.data === " "))
      e.preventDefault();
  };
  return (
    <AddChannelDiv>
      <ChannelName
        type="text"
        placeholder="Channel name"
        value={channelName}
        onChange={handleNameChange}
        onBeforeInput={handleCheckChars}
      />
      <AddButton onClick={handleAddChannel}>add</AddButton>
    </AddChannelDiv>
  );
};

export default AddChannelButton;
