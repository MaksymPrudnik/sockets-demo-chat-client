import React, { useState } from "react";
import styled from "styled-components";
import { socket } from "../../service/socket";
import { useLocation } from "react-router-dom";

import { BsPaperclip } from "react-icons/bs";
import { RiDeleteBin7Line, RiSendPlane2Line } from "react-icons/ri";
import Loader from "../Loader/Loader";

const Section = styled.section`
  justify-self: end;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.subBody};

  @media (max-width: 600px) {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;
const ImagePreview = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  svg {
    cursor: pointer;
    color: ${({ theme }) => theme.color};
  }
  svg:hover {
    color: ${({ theme }) => theme.color}aa;
  }

  a {
    margin-bottom: 0.5rem;
    text-decoration: none;
    color: ${({ theme }) => theme.color};
  }
`;
const Inputs = styled.div`
  display: flex;
  justify-content: center;
`;
const MessageBody = styled.input`
  width: 100%;
  line-height: 1.5rem;
  padding-left: 0.5rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.color};
  border: 1.5px solid ${({ theme }) => theme.color};
  border-top-left-radius: 0.7rem;
  border-bottom-left-radius: 0.7rem;

  @media (max-width: 600px) {
    line-height: 2.5rem;
    font-size: 1.2rem;
  }
`;
const SendButton = styled.button`
  display: flex;
  align-items: center;
  border: 1.5px solid ${({ theme }) => theme.color};
  border-top-right-radius: 0.7rem;
  border-bottom-right-radius: 0.7rem;
  background-color: ${({ theme }) => theme.body};

  @media (max-width: 600px) {
    line-height: 2.5rem;
    font-size: 1.2rem;
  }

  svg {
    color: ${({ theme }) => theme.color};
  }
`;
const InputLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1.5rem;
  padding: 0 0.5rem;
  border: 1px solid ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.body};
  text-align: center;

  @media (max-width: 600px) {
    line-height: 2.5rem;
    font-size: 1.2rem;
  }

  svg {
    color: ${({ theme }) => theme.color};
  }
  input[type="file"] {
    display: none;
  }
`;

const HOST = process.env.REACT_APP_HOST || "http://localhost:5000";

const NewMessageField = ({ username }) => {
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const clearFile = () => {
    setFileValue("");
    setImageUrl("");
  };

  const sendFileToS3 = (signedRequest, url, file) => {
    fetch(signedRequest, {
      method: "put",
      body: file,
    })
      .then((response) => {
        if (!response.ok) return Promise.reject("Error uploading file");
      })
      .catch((err) => setError(err.message || err.toString()))
      .finally(() => {
        setImageUrl(url);
        setLoadingImage(false);
      });
  };

  const handleChangeMessage = (e) => setMessage(e.target.value);

  const handleSend = () => {
    socket.emit("new message", {
      channel: location.pathname.slice(1),
      body: { username, message, img: imageUrl },
    });
    setMessage("");
    clearFile();
  };

  const handleFileLoad = (e) => {
    setLoadingImage(true);
    setFileValue(e.target.value);
    const newFile = e.target.files[0];
    if (!newFile.type) {
      clearFile();
      return setError("Allowed types: png, jpeg");
    }
    if (!newFile) {
      return setError("No file selected");
    }
    fetch(`${HOST}/sign-s3?file-name=${newFile.name}&file-type=${newFile.type}`)
      .then((response) => {
        if (!response.ok) return Promise.reject("Unable to get S3 URL");
        return response.json();
      })
      .then(({ signedRequest, url }) =>
        sendFileToS3(signedRequest, url, newFile)
      )
      .catch((err) => {
        setError(err);
        setLoadingImage(false);
      });
  };

  return (
    location.pathname !== "/" && (
      <Section>
        {error && <p>{error}</p>}
        {loadingImage ? (
          <Loader />
        ) : (
          imageUrl && (
            <ImagePreview>
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                {fileValue.slice(12)}
              </a>
              <RiDeleteBin7Line onClick={clearFile} />
            </ImagePreview>
          )
        )}
        <Inputs>
          <MessageBody
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={handleChangeMessage}
          />
          <InputLabel className="message-file-input">
            <BsPaperclip />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileLoad}
              value={fileValue}
            />
          </InputLabel>
          <SendButton onClick={handleSend}>
            <RiSendPlane2Line />
          </SendButton>
        </Inputs>
      </Section>
    )
  );
};

export default NewMessageField;
