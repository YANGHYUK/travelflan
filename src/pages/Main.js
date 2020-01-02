import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Row,
  Column,
  MarginDiv,
  Text,
  Container
} from "../components/ResponsiveComponents";
import Header from "../components/Header";

import ListGrid from "../components/ListGrid";
import StyledButton from "../components/Button";
import CustomButton from "../components/CustomButton";
import StyledTopButton from "../components/TopButton";
import InputModal from "../components/InputModal";

import { fetchAlbumData } from "../fetchCollection/index";
import { ContextReplacementPlugin } from "webpack";

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

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState([]);
  const [page, setPage] = useState(0);
  const [myId, setMyId] = useState("");

  const [formData, setFormData] = useState({
    userId: myId,
    id: data.length,
    title: "",
    image: null
  });

  const onhandleChange = e => {
    let value = e.target.value;
    if (value) {
      setFormData({
        ...formData,
        userId: myId,
        id: data.length + 1,
        title: value,
        image: null
      });
    }
  };

  const onhandleSubmit = () => {
    let newDataSet = formData;
    let renewLoadData = loadData;
    renewLoadData.unshift(newDataSet);
    console.log({ renewLoadData });
    // setLoadData(renewLoadData);
  };

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
    let latestOrderedData = wholeData.reverse();
    if (wholeData) {
      setData(latestOrderedData.reverse());
      setLoadData(latestOrderedData.reverse().slice(page, (page + 1) * 5));
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

  const { title } = formData;

  return (
    <Container>
      <Header myId={myId} onhandleLogout={onhandleLogout} />
      <Row>
        {modalOpen && (
          <InputModal
            setModalOpen={setModalOpen}
            userId={myId}
            title={title}
            onhandleEnroll
            onChange={onhandleChange}
            onSubmit={onhandleSubmit}
          />
        )}
        <Column xs="12">
          <ContentBox>
            {loading ? (
              <div>loading...</div>
            ) : (
              <>
                <ListGrid data={loadData} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "flex-end",
                    paddingRight: "5%"
                  }}
                >
                  <CustomButton
                    name="write +"
                    width="50px"
                    height="30px"
                    onClick={setModalOpen}
                  />
                </div>
                <div style={{ maxWidth: "500px" }}>
                  <StyledButton
                    onClick={onhandleListLoad}
                    name="more"
                    active={data.length > loadData.length ? true : false}
                  />
                </div>
              </>
            )}
          </ContentBox>
          <StyledTopButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            top
          </StyledTopButton>
        </Column>
      </Row>
    </Container>
  );
};

export default Main;
