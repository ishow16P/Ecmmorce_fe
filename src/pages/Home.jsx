import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Newletter } from "../components/Newletter";
import { Products } from "../components/Products";
import { Silder } from "../components/Silde";
import jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 100%;
`;

function HomePage() {
  const token = localStorage.getItem("token");
  let role;
  let Id;
  if(token){
    const decoded = jwtDecode(token)
    role = decoded.role;
    Id = decoded.id;
  }
  return (
    <Container>
      <Navbar id={Id} role={role} />
      <Silder />
      <Categories />
      <Products headText="Popular Products" sort="" />
      <Newletter />
      <Footer />
    </Container>
  );
}

export default HomePage;
