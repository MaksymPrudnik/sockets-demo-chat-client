import io from "socket.io-client";

export const HOST = process.env.REACT_APP_HOST || 'http://localhost:5000';

export const socket = io(HOST);