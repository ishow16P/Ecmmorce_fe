import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../reponsive";

export const CategoryItem = (porps) => {
  const { item, key } = porps;
  return (
    <Container>
      <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
        <ImgContainer>
          <Img src={item.categoryImage} alt="" />
        </ImgContainer>
        <Info className="Info">
          <Title >{item.categoryName}</Title>
          <Button>SHOP NOW </Button>
        </Info>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  height: auto;
  position: relative;
  margin: 0 10px;
`;
const ImgContainer = styled.div`
  width: 100%;
  height: 400px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
`;
const Img = styled.img`
  margin: 0 auto;
  position: relative;
  width: 300px;
  height: 320px;
  justify-content: center;
  ${mobile({ height: "50vh" })}
`;
const Info = styled.div`
  width: 100%;
  height: 300px;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color:#000;
`;
const Button = styled.button`
  padding: 20px 50px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  border: 0px;
  background: transparent;
  position: relative;
  transition: all 0.25s ease;
  outline: none;
  &:hover::after {
    width: 100%;
  }
  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    width: 10%;
    height: 5px;
    background: #000;
    left: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.25s ease;
    left: 50%;
    transform: translateX(-50%);
  }
`;
