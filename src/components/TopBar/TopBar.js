import React from "react";
import styled from "styled-components";

import { FaStream } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const TopBarSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.subBody};
  border-bottom: 0.5px solid ${({ theme }) => theme.color};

  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.5rem;
  }
`;
const UsernameInput = styled.input`
  margin: 0.5rem;
  border: none;
  width: 100%;
  background-color: transparent;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.color};

  @media (max-width: 600px) {
  }
`;
const ChannelsToggle = styled.button`
  margin: 0 1rem;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  @media (min-width: 600px) {
    display: none;
    font-size: 1.2rem;
  }
`;

const TopBar = ({ username, switchChannelsToggle, toggleTheme }) => {
  return (
    <TopBarSection>
      <ChannelsToggle onClick={() => switchChannelsToggle()}>
        <FaStream />
      </ChannelsToggle>
      <UsernameInput type="text" {...username} />
      <ThemeToggle toggleTheme={toggleTheme} />
    </TopBarSection>
  );
};

export default TopBar;
