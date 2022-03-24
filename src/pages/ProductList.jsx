import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Newletter } from "../components/Newletter";
import { Products } from "../components/Products";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [sort, setSort] = useState("");
  const token = localStorage.getItem("token");
  let role;
  let Id;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
    Id = decoded.id;
  }
  return (
    <Container>
      <Navbar id={Id} role={role}/>
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select name="price" onChange={(e) => setSort(e.target.value)}>
            <Option value={""} selected >Newest</Option>
            <Option value={"asc"}>Price (asc)</Option>
            <Option value={"desc"}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} sort={sort}/>
      <Newletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ fontSize: "18px", fontWeight: "600" })}
`;
const Select = styled.select`
  padding: 10px;
`;
const Option = styled.option`
  margin: 5px;
`;
