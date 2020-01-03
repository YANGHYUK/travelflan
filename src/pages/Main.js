import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Column, Container } from "../components/ResponsiveComponents";
import Header from "../components/Header";

import ListGrid from "../components/ListGrid";
import StyledButton from "../components/Button";
import CustomButton from "../components/CustomButton";
import StyledTopButton from "../components/TopButton";
import InputModal from "../components/InputModal";

import { fetchAlbumData } from "../fetchCollection/index";

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

const ID_NUMBER = 101;

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

  //updateFlag
  //글 작성 수정 value
  const [updateInputValue, setUpdateInputValue] = useState({});

  const [formData, setFormData] = useState({
    userId: myId,
    id: ID_NUMBER,
    title: "",
    image: null
  });

  const onhandleCloseModal = boolean => {
    setModalOpen(boolean);
    setFormData({
      ...formData,
      userId: myId,
      title: "",
      image: null
    });
  };

  //글 수정 힘수
  const onhandleUpdate = targetId => {
    let updateTargetId = targetId;
    if (updateTargetId && updateInputValue) {
      let updateWholeData = data.map(ele => {
        if (ele.id === updateTargetId) {
          ele.title = updateInputValue;
          return ele;
        } else {
          return ele;
        }
      });
      let updateLoadData = loadData.map(ele => {
        if (ele.id === updateTargetId) {
          ele.title = updateInputValue;
          return ele;
        } else {
          return ele;
        }
      });
      setData(updateWholeData);
      setLoadData(updateLoadData);
      setUpdateInputValue("");
    }
  };

  //글 삭제
  const onhandleDelete = targetId => {
    let deleteTargetId = targetId;
    let dataAfterDeleted = data.filter(ele => {
      return ele.id !== deleteTargetId ? ele : false;
    });
    let loadDataAfterDeleted = loadData.filter(ele => {
      return ele.id !== deleteTargetId;
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
      token ? setMyId(token.split("/")[0]) : props.history.push("/signin");
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
    return function() {
      console.log("clean-up");
    };
  }, []);

  const { title } = formData;

  return (
    <Container>
      <Header id="header" myId={myId} history={props.history} />
      <Row>
        {modalOpen && (
          <InputModal
            id="inputmodal"
            onhandleCloseModal={onhandleCloseModal}
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
                  id="listgrid"
                  data={loadData}
                  myId={myId}
                  onhandleUpdate={onhandleUpdate}
                  onhandleDelete={onhandleDelete}
                  setUpdateInputValue={setUpdateInputValue}
                />
                {/* <div
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
                </div> */}
                <div style={{ maxWidth: "500px" }}>
                  {/* 리스트 추가버튼 */}
                  <StyledButton
                    id="add_listbutton"
                    onClick={onhandleListLoad}
                    name="more"
                    active={data.length > loadData.length ? true : false}
                  />
                </div>
              </>
            )}
          </ContentBox>
          <div
            style={{
              position: "fixed",
              top: 10,
              right: 170
            }}
          >
            {/* 글작성 추가 버튼 */}
            <CustomButton
              name="new post"
              width="50px"
              height="30px"
              onClick={setModalOpen}
            />
          </div>
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
