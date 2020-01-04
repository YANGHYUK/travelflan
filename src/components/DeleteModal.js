import React from "react";
import styled from "styled-components";
// import './Modal.scss';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
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
    margin: 0;
    margin-top: 8px;
    button {
      width: 100%;
      padding: 12px 0;
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

const DeleteModal = ({ setModalOpen, content, onhandleDelete, targetId }) => {
  const onClickDeleteButton = () => {
    console.log({ targetId });
    setModalOpen(false);
    onhandleDelete(targetId);
  };
  return (
    <React.Fragment>
      <ModalOverlay />
      <ModalContent>
        <p className="title">알림</p>
        <div className="content">
          <p>{content}</p>
        </div>
        <div className="button-wrap">
          <button onClick={() => setModalOpen(false)}> 취소 </button>
          <button onClick={onClickDeleteButton}> 삭제 </button>
        </div>
      </ModalContent>
    </React.Fragment>
  );
};
export default DeleteModal;
