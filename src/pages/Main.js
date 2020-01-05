import React, { useState, useEffect, useContext, useCallback } from "react";
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
  //마운트 체크(클린업 위한)
  const [didMount, setDidMount] = useState(false);

  //데이터 로딩
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

  //글update 수정 value
  const [updateInputValue, setUpdateInputValue] = useState("");

  //내 post만 모아놓는 데이터
  const [myPostData, setMyPostData] = useState([]);

  //전체 post가 노출될 것인지 내 post가 노출될 것인지 확인 위한 flag
  const [currentPostTarget, setCurrentPostTarget] = useState("all");

  const [formData, setFormData] = useState({
    userId: myId,
    id: ID_NUMBER,
    title: "",
    image: null
  });

  const { title, image } = formData;

  //모달 여닫기
  const onhandleCloseModal = boolean => {
    setModalOpen(boolean);
    setFormData({
      ...formData,
      userId: myId,
      title: "",
      image: null
    });
  };

  //post 수정 힘수
  const onhandleUpdate = targetId => {
    let updateTargetId = targetId;
    if (updateTargetId) {
      let updateWholeData = data.map(ele => {
        if (ele.id === updateTargetId) {
          if (title.length === 0 && updateInputValue.length !== 0) {
            ele.title = updateInputValue;
          }
          return ele;
        } else {
          return ele;
        }
      });
      let updateLoadData = loadData.map(ele => {
        if (ele.id === updateTargetId) {
          if (title.length === 0 && updateInputValue.length !== 0) {
            ele.title = updateInputValue;
          }
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

  //post 삭제
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

  //post작성 글 입력
  const onhandleChangeText = e => {
    let value = e.target.value;
    value = value.replace(/^\s+/, "");
    setFormData({
      ...formData,
      userId: myId,
      title: value,
      image: null
    });
  };

  //post작성 이미지 입력
  const onhandleChangeImage = e => {
    let imageFile = URL.createObjectURL(e.target.files[0]);
    if (imageFile) {
      setFormData({
        ...formData,
        image: imageFile
      });
    }
  };

  //post작성 등록
  const onhandleSubmit = () => {
    let newDataSet = formData;
    let wholeData = data;
    let renewLoadData = loadData;
    let myLoadData = myPostData;

    renewLoadData.unshift(newDataSet);
    wholeData.unshift(newDataSet);
    myLoadData.unshift(newDataSet);

    if (renewLoadData) {
      setModalOpen(false);
      setLoadData(renewLoadData);
      setData(wholeData);
      setMyPostData(myLoadData);
    }
    setFormData({
      ...formData,
      title: "",
      id: formData.id + 1,
      image: image
    });
    //post 등록 시, 상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //post작성목록 더 불러오기
  const onhandleListLoad = () => {
    //로드 데이터 갯수가 5개 단위가 아닐시에는 새로 불러오는 데이터의 갯수에 대한 조정이 필요하다. 아래는 그 로직
    if (loadData.length % 5 !== 0) {
      setLoadData(
        loadData.concat(
          data.slice(page * 5, page * 5 + Math.abs(5 - (loadData.length % 5)))
        )
      );
      setPage(page + 1);
    } else {
      setLoadData(loadData.concat(data.slice(page * 5, (page + 1) * 5)));
    }
  };

  // const dataList = useCallback(
  //   () =>
  //     ListGrid(
  //       (loadData,
  //       myId,
  //       image,
  //       onhandleUpdate,
  //       onhandleDelete,
  //       setUpdateInputValue)
  //     ),
  //   [loadData]
  // );

  useEffect(() => {
    const tokenCheck = () => {
      let token = localStorage.getItem("token");
      token ? setMyId(token.split("/")[0]) : props.history.push("/signin");
    };
    tokenCheck();

    const loadFetchData = async () => {
      let wholeData = await fetchAlbumData();
      let latestOrderedData = wholeData.reverse();
      if (wholeData.length > 0) {
        setData(latestOrderedData);
        setLoadData(latestOrderedData.slice(page * 5, (page + 1) * 5));
        setPage(page + 1);
        setLoading(false);
      }
    };
    loadFetchData();
    //cleanup 함수
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <Container>
      <Header
        id="header"
        myId={myId}
        history={props.history}
        setCurrentPostTarget={setCurrentPostTarget}
      />
      <Row>
        {modalOpen && (
          <InputModal
            id="inputmodal"
            onhandleCloseModal={onhandleCloseModal}
            userId={myId}
            title={title}
            image={image}
            onChangeText={onhandleChangeText}
            onChangeImage={onhandleChangeImage}
            onSubmit={onhandleSubmit}
          />
        )}
        <Column xs="12">
          <ContentBox>
            {loading ? (
              <div>loading...</div>
            ) : (
              <>
                {/* {dataList} */}
                <ListGrid
                  id="listgrid"
                  data={
                    loadData.length && currentPostTarget === "all"
                      ? loadData
                      : myPostData
                  }
                  myId={myId}
                  image={image}
                  onhandleUpdate={onhandleUpdate}
                  onhandleDelete={onhandleDelete}
                  setUpdateInputValue={setUpdateInputValue}
                />
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
          {/* <div //내 작성글만 골라보기
            style={{
              position: "fixed",
              top: 10,
              right: 330
            }}
          >
            <CustomButton
              name="my post"
              width="100px"
              height="30px"
              onClick={setModalOpen}
            />
          </div> */}
          <div
            style={{
              position: "fixed",
              top: 10,
              right: 170
            }}
          >
            {/* new post 버튼 */}
            <CustomButton
              name="new post"
              width="100px"
              height="30px"
              onClick={() => onhandleCloseModal(true)}
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
