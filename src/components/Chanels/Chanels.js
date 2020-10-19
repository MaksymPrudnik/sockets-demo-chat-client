import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { socket } from "../../service/socket";
import AddChannelButton from "../AddChannelButton/AddChanelButton";
import Loader from "../Loader/Loader";
import styled from "styled-components";

const ChannelsSection = styled.section`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.subBody};
  border-right: 0.5px solid ${({ theme }) => theme.color};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 600px) {
    display: ${({ toggle }) => (toggle ? "flex" : "none")};
    padding-top: 2rem;
  }
`;
const ChannelsList = styled.ul`
  padding: 0 1rem;
  list-style: none;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChannelItem = styled.li`
  margin: 0.5rem 0;
  text-align: left;

  a {
    display: inline-block;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 0.5px solid transparent;
    border-radius: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
    font-weight: 500;
    font-size: 1.05rem;
  }

  a:hover,
  a.selected {
    background-color: ${({ theme }) => theme.body};
    border: 0.5px solid ${({ theme }) => theme.color};
  }
`;

const Chanels = ({ toggle, switchChannelsToggle }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.emit("load channels");
    setLoading(true);
  }, []);

  useEffect(() => {
    socket.on("channels loaded", (channelsList) => {
      setChannels(channelsList);
      setLoading(false);
    });

    socket.on("channel added", (channel) =>
      setChannels((channels) => [...channels, channel])
    );
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ChannelsSection toggle={toggle}>
      <AddChannelButton />
      <ChannelsList>
        {channels.length
          ? channels.map((channel, i) => (
              <ChannelItem key={i}>
                <NavLink
                  to={`/${channel.name}`}
                  onClick={() => switchChannelsToggle()}
                  activeClassName="selected"
                >
                  {channel.name.replace("-", " ")}
                </NavLink>
              </ChannelItem>
            ))
          : "There is no chanels"}
      </ChannelsList>
    </ChannelsSection>
  );
};

export default Chanels;
