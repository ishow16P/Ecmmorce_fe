import React from "react";
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { silderItem } from "../data";
import { mobile } from "../reponsive";


export const Silder = () => {
  const [slideIndex, setSildeIndex] = useState(0);
  const handleClick = async (direction) => {
    if (direction === "left") {
       setSildeIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
       setSildeIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }

  };
  return (
    <Container>
      <Arrow id="left" direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {silderItem.map((item, index) => (
          <Slide  key={item.id}>
            <ImgContainer className="ImgContainer">
              <Img className="Image" src={item.imgURL} alt="" />
            </ImgContainer>
            <InfoContainer >
              <Title className="title">{item.title}</Title>
              <Desc className="descripton">{item.desc}</Desc>
              <Button className="btn-slide">SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow id="right"  direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #f5fbfd;
  ${mobile({ display:"none"})}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  left :${(props) => props.direction === "left" && "10px"};
  right :${(props) => props.direction === "right" && "10px"};
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props=>props.slideIndex * -100)}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;
const ImgContainer = styled.div`
  height: 80%;
  flex: 1;
  padding: 50px;
`;
const Img = styled.img`
  height: 60vh;
  height: 400px;
  position: relative;
  left: 40%;
`;
const InfoContainer = styled.div`
  height: 80%;
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  position: relative;
  background-color: #fff;

  &:hover {
    color: white;
    background-color: transparent;
  }
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.1);
    background: #000;
    z-index: -1;
    opacity: 0;
    transition: all 0.25s ease;
  }
  &:hover::after {
    transform: scale(1);
    opacity: 1;
  }
`;
