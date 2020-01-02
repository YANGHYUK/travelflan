import React from "react";
import styled from "styled-components";
// import './Modal.scss';
import Input from "./Input";

const ModalContent = styled.div`
  position: fixed;
  top: 300px;
  left: 90%;
  transform: translate(-50%, -50%);
  width: 320px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  & > * {
    &:first-child {
      margin-top: 16px;
    }
    margin-left: 16px;
    margin-right: 16px;
  }
  p.title {
    font-size: 16pt;
    font-weight: bold;
    color: #333;
  }
  .content {
    border-top: 1px solid #bebebe;
    margin-top: 16px;
    p {
      padding: 8px;
      font-size: 12pt;
      color: #999;
    }
  }
  .button-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    margin-top: 8px;
    button {
      width: 100%;
      padding: 12px 0;
      border-radius: 0 0 10px 10px;
      background-color: #ad7cef;
      font-size: 13pt;
      color: white;
      border: 0;
      cursor: pointer;
      &:hover {
        background-color: #7f49c8;
      }
      &:active {
        background-color: #7e49c8;
      }
    }
  }
`;

const Image = styled.div`
  background-size: contain;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 10px;
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const InputModal = ({ setModalOpen, userId, title, onChagne, onSubmit }) => {
  return (
    <React.Fragment>
      <ModalContent>
        <p className="title">TravelStory 작성하기</p>
        <div className="content">
          <Input value={`user : ${userId}`} />
          <Input value={title} placeholder="title" onChagne={onChagne} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px"
            }}
          >
            <Image url="https://via.placeholder.com/150" />
          </div>
        </div>
        <div className="button-wrap">
          <button onClick={() => setModalOpen(false)}> Cancel </button>
          <button onClick={onSubmit}> Enroll </button>
        </div>
      </ModalContent>
    </React.Fragment>
  );
};
export default InputModal;
