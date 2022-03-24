import { categories , popularProduct } from "../data";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryItem } from "./CategoryItem";
import { mobile } from "../reponsive";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";

export const Categories = () => {
  const [slideIndex, setSildeIndex] = useState(0);
  const [category, setCategory] = useState([])
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/category?sort=categoryName",{method: "GET"});
        const data = await res.json();
        setCategory(data.data.category);
        
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);
  const handleClick = async (direction) => {
    if (direction === "left") {
      setSildeIndex(slideIndex > 0 ? slideIndex - 0.5 : 0);
    } else {
      setSildeIndex(slideIndex < 1  ? slideIndex + 0.5 : 0);
    }
    console.log(slideIndex);
  };
  return (
    <Container>
      <TitleContainer>
        <Title>Categories</Title>
      </TitleContainer>
      <Arrow id="left" direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
          <ContainerItem categoryWidth= {category.length}>
            {category.map((item, index) => (
              <CategoryItem item={item} key={item._id} />
            ))}
          </ContainerItem>
  
      </Wrapper>
      <Arrow id="right" direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 10%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow:hidden;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
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
  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  position: relative;
  flex: 10;
  left: 2%;
`;
const Title = styled.h2`
  position: relative;
  margin-top: 20px;
  font-size: 2.3rem;
`;
const ContainerItem = styled.div`
  width: auto;
  display: flex;
  flex-wrap: nowrap;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
