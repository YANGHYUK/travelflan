import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Row, Column, Text } from "../components/ResponsiveComponents";
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background: linear-gradient(to right, #686de0 0%, #9647db 100%);
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  padding-left: 5%;
  padding-right: 5%;
`;

const AccountBox = styled.div`
  min-width: 100px;
  max-width: 150px;
  height: 100%;
  margin-right: 7%;
  z-index: 100;
`;

const DropDown = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  position: absolute;
  z-index: 100;
  margin-top: 110px;
  margin-right: 30px;
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const MyProfile = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: solid 1px transparent;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-right: 50px;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding-box;
    background-clip: padding-box;
    > ${DropDown} {
      display: flex;
    }
  }
`;

const IdBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px black;
  padding-bottom: 2px;
  padding-left: 5px;
  padding-right: 5px;
`;
const ProfileText = styled.span`
  color: #bdc3c7;
  margin-top: 2px;
  margin-bottom: 2px;
  padding-top: 3px;
  padding-bottom: 3px;
  width: 100%;
`;

const IdBox_Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background-color: #0666d6;
    > ${ProfileText} {
      color: white;
    }
  }
`;

const Image = styled.div`
  background-image: url("https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-logout-icon-png-image_4164040.jpg");
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 10px;
  margin-left: 5px;
  margin-bottom: 2px;
`;

const onhandleLogout = history => {
  localStorage.removeItem("token");
  history.push("/signin");
};

export default function Header({ myId, history, setCurrentPostTarget }) {
  const onhandleClickMyPostButton = () => {
    setCurrentPostTarget("mine");
  };

  const onhandleClickWholePostButton = () => {
    setCurrentPostTarget("all");
  };
  return (
    <Row>
      <Column xs="12">
        <HeaderContainer>
          <Text fontSize="1.5rem" color="white" fontWeight="bold">
            Travelstagram
          </Text>
          <AccountBox>
            <MyProfile>
              <DropDown>
                <IdBox>
                  <Text fontSize="1.3rem" fontWeight="bold">
                    Signed in as
                  </Text>
                  <Text fontSize="1rem">{myId}</Text>
                </IdBox>
                <IdBox_Content active={true}>
                  <Image />
                  <ProfileText onClick={() => onhandleLogout(history)}>
                    LogOut
                  </ProfileText>
                </IdBox_Content>
                {/* <IdBox_Content active={true}>
                  <Image />
                  <ProfileText onClick={() => onhandleClickMyPostButton()}>
                    MyPost
                  </ProfileText>
                </IdBox_Content>
                <IdBox_Content active={true}>
                  <Image />
                  <ProfileText onClick={() => onhandleClickWholePostButton()}>
                    WholePost
                  </ProfileText>
                </IdBox_Content> */}
              </DropDown>
            </MyProfile>
          </AccountBox>
        </HeaderContainer>
      </Column>
    </Row>
  );
}
