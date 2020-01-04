import React, { useState } from "react";
import styled from "styled-components";
import { Row, Column, MarginDiv, Text } from "./ResponsiveComponents";
import DeleteModal from "./DeleteModal";

import Modal from "./Modal";
const ListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 100px;
  max-width: 500px;
  min-height: 300px;
  padding: 20px;
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const Image = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${props => props.url});
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 10px;
`;

const ImageModifyBox = styled.div`
  position: absolute;
  cursor: pointer;
  border-radius: 13px;
  &:hover {
    background-color: black;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 180px;
  width: 100%;
`;

const UserImage = styled.div`
  background-size: contain;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-top: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UpdateInpuField = styled.input`
  min-width: 100px;
  width: 90%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: 15px; /* line-height 초기화 */
  padding: 0.3em 0.6em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  font-size: 12px;
  border: 1px solid #999;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const UpdateButtonField = styled.button`
min-width: ${props => (props.width ? props.width : "26px")};
height:${props => (props.height ? props.height : "26px")};
display:flex;
justify-content:center;
align-items:center;
padding:1px;
border-color:transparent;
border-radius:13px;
font-family: NotoSansKR;
font-size: 8px;
font-weight: 500;
font-style: normal;
font-stretch: normal;
line-height: 1.47;
letter-spacing: -0.75px;
text-align: center;
color: black;
text-decoration: none;
background-color: ${props =>
  props.backgroundColor ? props.backgroundColor : "white"}
cursor:pointer;
&:hover {
  background-color:#ecf0f1;
  color:#black;
}
margin-top:10px;
margin-bottom: 10px;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
outline-style: none;
margin-left:2px;
`;

const showDataList = (
  data,
  myId,
  onhandleUpdate,
  onhandleDelete,
  setUpdateInputValue
) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [targetId, setTargetId] = useState(null);

  // 업데이트 수정 input value 전달함수
  const onhandleChangeUpdateValue = e => {
    let value = e.target.value;
    if (value) {
      setUpdateInputValue(value);
    }
  };

  //삭제버튼 클릭
  const onhandleClickDeleteButton = id => {
    setModalOpen(true);
    setTargetId(id);
  };

  //수정 버튼 클릭
  const onhandleClickUpdateButton = id => {
    setUpdateFlag(true);
    setTargetId(id);
  };

  //업데이트 완료버튼 클릭
  const onhandleClickUpdateCompleteButton = id => {
    setUpdateFlag(false);
    onhandleUpdate(id);
  };

  return data.map((ele, idx) => {
    //현재 변경되는 타겟 id에 대한 테스트
    if (myId === ele.userId && updateFlag) {
      // console.log("ele.id", ele.id);
      // console.log("targetId", targetId);
    }
    return (
      <Column xs="6" sm="6" md="4" lg="2.4" key={idx}>
        {modalOpen && (
          <DeleteModal
            content={"삭제하시겠습니까?"}
            setModalOpen={setModalOpen}
            onhandleDelete={onhandleDelete}
            targetId={targetId}
          />
        )}
        <ListCard>
          <ContentBox>
            <ImageBox>
              <div>
                <UserImage url="https://www.logolynx.com/images/logolynx/s_cb/cbd29542455b9e0cc175289ff24cecaa.jpeg" />
                <Text fontSize="8px">No.{ele.id}</Text>
              </div>
              <Text fontSize="11px">{ele.userId}</Text>
            </ImageBox>
            <div style={{ width: "100%", wordBreak: "keep-all" }}>
              {myId === ele.userId && ele.id === targetId && updateFlag ? (
                <UpdateInpuField
                  defaultValue={ele.title}
                  onChange={e => onhandleChangeUpdateValue(e)}
                />
              ) : (
                <Text fontSize="20px">{ele.title}</Text>
              )}
            </div>
            {myId === ele.userId ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%"
                }}
              >
                {ele.id === targetId && updateFlag ? (
                  <UpdateButtonField
                    onClick={() => onhandleClickUpdateCompleteButton(ele.id)}
                  >
                    {/* 완료 */}
                    <Image
                      url="https://images.squarespace-cdn.com/content/v1/56e84118e707eb0a43fccbc3/1466381407394-MP1XG5Y8MNUG53VJ2XB1/ke17ZwdGBToddI8pDm48kGfiFqkITS6axXxhYYUCnlRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxQ1ibo-zdhORxWnJtmNCajDe36aQmu-4Z4SFOss0oowgxUaachD66r8Ra2gwuBSqM/complete-logo-design-services"
                      width="25px"
                      height="25px"
                    />
                  </UpdateButtonField>
                ) : (
                  <>
                    <UpdateButtonField
                      onClick={() => onhandleClickUpdateButton(ele.id)}
                    >
                      {/* 수정 */}
                      <Image
                        url="https://png.pngtree.com/svg/20170718/modify_code_1018099.png"
                        width="25px"
                        height="25px"
                      />
                    </UpdateButtonField>
                    <UpdateButtonField
                      onClick={() => onhandleClickDeleteButton(ele.id)}
                    >
                      {/* 삭제 */}
                      <Image
                        url="https://f1.pngfuel.com/png/466/374/467/delete-key-line-logo-button-directory-trash-png-clip-art.png"
                        width="25px"
                        height="25px"
                      />
                    </UpdateButtonField>
                  </>
                )}
              </div>
            ) : null}
          </ContentBox>
          {myId === ele.userId && ele.id === targetId && updateFlag ? (
            <ImageModifyBox
              onClick={() => console.log("사진 업데이트 기능은 준비중..")}
            >
              <Image
                url="https://icon2.cleanpng.com/20180407/pew/kisspng-video-cameras-logo-photography-clip-art-camera-5ac987b171c340.706058951523156913466.jpg"
                width="26px"
                height="26px"
              />
            </ImageModifyBox>
          ) : null}
          <Image
            url={ele.image ? ele.image : "https://via.placeholder.com/150"}
            width="150px"
            height="150px"
          />
        </ListCard>
      </Column>
    );
  });
};

//props로 내려오는 데이터들만 관찰하기 위해 따로 ..
export default function ListGrid({
  data,
  myId,
  onhandleUpdate,
  onhandleDelete,
  setUpdateInputValue
}) {
  return (
    <ListContainer>
      <Row>
        {showDataList(
          data,
          myId,
          onhandleUpdate,
          onhandleDelete,
          setUpdateInputValue
        )}
      </Row>
    </ListContainer>
  );
}
