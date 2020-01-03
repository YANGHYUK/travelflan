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

const ID_NUMBER = 101;

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

  //글작성 모달
  const [modalOpen, setModalOpen] = useState(false);

  //전체 데이터
  const [data, setData] = useState([]);

  //로딩되는 데이터
  const [loadData, setLoadData] = useState([]);

  //페이지 구분
  const [page, setPage] = useState(0);

  //내 아이디
  const [myId, setMyId] = useState("");

  const [formData, setFormData] = useState({
    userId: myId,
    id: ID_NUMBER,
    title: "",
    image: null
  });

  //글 수정
  const onhandleUpdate = targetId => {
    console.log({ targetId });
  };

  //글 삭제
  const onhandleDelete = targetId => {
    let deleteTargetIndex = targetId;
    let dataAfterDeleted = data.filter(ele => {
      return ele.id !== deleteTargetIndex ? ele : false;
    });

    let loadDataAfterDeleted = loadData.filter(ele => {
      return ele.id !== deleteTargetIndex;
    });
    setData(dataAfterDeleted);
    setLoadData(loadDataAfterDeleted);
    setPage(1);
  };

  //글작성 입력
  const onhandleChange = e => {
    let value = e.target.value;
    if (value) {
      setFormData({
        ...formData,
        userId: myId,
        title: value,
        image: null
      });
    }
  };

  //글작성 등록
  const onhandleSubmit = () => {
    let newDataSet = formData;
    let wholeData = data;
    let renewLoadData = loadData;

    renewLoadData.unshift(newDataSet);
    wholeData.unshift(newDataSet);

    if (renewLoadData) {
      setModalOpen(false);
      setLoadData(renewLoadData);
      setData(wholeData);
    }
    setFormData({
      ...formData,
      title: "",
      id: formData.id + 1,
      image: null
    });
  };

  //목록 더 불러오기
  const onhandleListLoad = () => {
    setLoadData(loadData.concat(data.slice(page * 5, (page + 1) * 5)));
    setPage(page + 1);
  };

  useEffect(() => {
    const tokenCheck = () => {
      let token = localStorage.getItem("token");
      token ? setMyId(token.split("/")[0]) : null;
      // props.history.push("/signin");
    };
    tokenCheck();

    const loadFetchData = async () => {
      let wholeData = await fetchAlbumData();
      let latestOrderedData = wholeData.reverse();
      if (wholeData) {
        setData(latestOrderedData);
        setLoadData(latestOrderedData.slice(page * 5, (page + 1) * 5));
        setPage(page + 1);
        setLoading(false);
      }
    };
    loadFetchData();
  }, []);

  const { title } = formData;

  return (
    <Container>
      <Header myId={myId} />
      <Row>
        {modalOpen && (
          <InputModal
            setModalOpen={setModalOpen}
            userId={myId}
            title={title}
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
                <ListGrid
                  data={loadData}
                  myId={myId}
                  onhandleUpdate={onhandleUpdate}
                  onhandleDelete={onhandleDelete}
                />
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
