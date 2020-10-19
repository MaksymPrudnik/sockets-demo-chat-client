import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";

const Button = styled.button`
  width: auto;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.color};
  margin: 0 1rem;
  padding: 0.2rem;

  svg {
    height: auto;
    width: 1.2rem;
    font-size: 1.2rem;
    transition: all 0.3s linear;
  }

  // sun icon
  svg:first-child {
    display: ${({ theme }) => (theme.name === "light" ? "none" : "block")};
  }
  // moon icon
  svg:nth-child(2) {
    display: ${({ theme }) => (theme.name === "light" ? "block" : "none")};
  }
`;

const ThemeToggle = ({ toggleTheme }) => (
  <Button onClick={toggleTheme}>
    <FaSun />
    <FaMoon />
  </Button>
);

export default ThemeToggle;
