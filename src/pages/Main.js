import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Row,
  Column,
  MarginDiv,
  Text,
  Container,
  Header
} from "../components/StyledComponents";

import { fetchAlbumData } from "../fetchCollection/index";

import ListGrid from "../components/ListGrid";
import StyledButton from "../components/Button";

const ContentBox = styled.div`
  display: flex;
  width:80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: width 0.8s ease-in;
  background-color: white;
  padding: 20px;
  margin: 80px 50px 80px; 80px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const AccountBox = styled.div`
  min-width: 100px;
  max-width: 150px;
  height: 100%;
  margin-right: 30px;
  z-index: 100;
`;

const DropDown = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  min-width: 130px;
  position: absolute;
  z-index: 100;
  margin-top: 80px;
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

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState([]);
  const [page, setPage] = useState(0);
  const [myId, setMyId] = useState("");

  const onhandleLogout = () => {
    localStorage.removeItem("token");
    props.history.push("/signin");
  };

  const onhandleListLoad = () => {
    setLoadData(loadData.concat(data.slice(page * 5, (page + 1) * 5)));
    setPage(page + 1);
  };

  const loadFetchData = async () => {
    let wholeData = await fetchAlbumData();
    if (wholeData) {
      setData(wholeData);
      setLoadData(wholeData.slice(page, (page + 1) * 5));
      setPage(page + 1);
      setLoading(false);
    }
  };
  useEffect(() => {
    const tokenCheck = () => {
      let token = localStorage.getItem("token");
      token ? setMyId(token.split("/")[0]) : props.history.push("/signin");
    };
    tokenCheck();
    loadFetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Column xs="12">
          <Header>
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
                    <ProfileText onClick={onhandleLogout}>LogOut</ProfileText>
                  </IdBox_Content>
                </DropDown>
              </MyProfile>
            </AccountBox>
          </Header>
        </Column>
        <Column xs="12">
          <ContentBox>
            {loading ? (
              <div>loading...</div>
            ) : (
              <>
                <ListGrid data={loadData}>hi</ListGrid>
                <div style={{ maxWidth: "500px" }}>
                  <StyledButton
                    onClick={onhandleListLoad}
                    name="more"
                    active={true}
                  >
                    load more
                  </StyledButton>
                </div>
              </>
            )}
          </ContentBox>
          {/* <TopButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            top
          </TopButton> */}
        </Column>
      </Row>
    </Container>
  );
};

export default Main;
