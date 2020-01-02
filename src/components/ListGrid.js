import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Column, MarginDiv, Text } from "./ResponsiveComponents";

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
  min-height: 250px;
  padding: 20px;
  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;
`;

const Image = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("https://via.placeholder.com/150");
  width: 150px;
  height: 150px;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 150px;
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
  margin-right: 20px;
  margin-bottom: 10px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const showDataList = data => {
  return data.map((ele, idx) => {
    let userId = ele.userId;
    let id = ele.id;
    let title = ele.title;
    return (
      <Column xs="6" sm="6" md="4" lg="2.4" key={idx}>
        <ListCard>
          <ContentBox>
            <ImageBox>
              <UserImage url="https://www.logolynx.com/images/logolynx/s_cb/cbd29542455b9e0cc175289ff24cecaa.jpeg" />
              <Text>user:{userId}</Text>
            </ImageBox>
            <div>
              <Text fontSize="20px">{title}</Text>
            </div>

            {/* <div>id:{id}</div> */}
          </ContentBox>
          <Image />
        </ListCard>
      </Column>
    );
  });
};

export default function ListGrid({ data }) {
  let propsData = data || [];
  return (
    <ListContainer>
      <Row>{showDataList(propsData)}</Row>
    </ListContainer>
  );
}
