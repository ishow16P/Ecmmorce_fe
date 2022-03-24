import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProduct } from "../data";
import { mobile } from "../reponsive";
import { Product } from "./Product";
import { useLocation } from "react-router-dom";

export const Products = (porps) => {
  const location = useLocation();
  const { headText, category, sort } = porps;
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [sort]);

  const getProducts = async () => {
    try {
      if(category){
        const response = await fetch(`http://localhost:5000/api/v1/product?sort=${sort}&categoryId=${category}`);
        const data = await response.json();
        setProducts(data.data.product);
      }else{
        const response = await fetch(`http://localhost:5000/api/v1/product?sort=${sort}`);
        const data = await response.json();
        setProducts(data.data.product);
      }
 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Continer>
      <TitleContainer>
        <Text>{headText}</Text>
      </TitleContainer>
      <ContainerProduct>
        {products.map((item, index) => (
          <Product item={item} key={item._id} />
        ))}
      </ContainerProduct>
    </Continer>
  );
};

const Continer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 10%;
  margin-bottom: 20px;
  ${mobile({ padding: "0px" })}
`;
const TitleContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  position: relative;
  left: 2%;
`;
const Text = styled.h2`
  position: relative;
  margin-top: 20px;
  font-size: 2.3rem;
`;
const ContainerProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
