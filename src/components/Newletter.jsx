import React from "react";
import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../reponsive";

export const Newletter = () => {
  return (
    <Container>
      <Title>Newletter</Title>
      <Desc>Get timely updates from your promotion</Desc>
      <ContainerInput>
        <Input placeholder="Your email..." />
        <Button>
          <Send />
        </Button>
      </ContainerInput>
    </Container>
  );
};

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
`;
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign:"center"})}
`;
const ContainerInput = styled.div`
  width: 40%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({width:"80%"})}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  font-size: 16px;
  font-weight: lighter;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: rgb(3, 161, 161);
  color: white;
  transition: all 0.2s ease;
  &:horver {
    background-color: rgb(7, 204, 204);
  }
`;

