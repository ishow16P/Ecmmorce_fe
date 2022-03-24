import React from "react";
import styled from "styled-components";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import { mobile } from "../reponsive";

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>IShow_.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vero
          qui provident error, ducimus magnam eum nihil reprehenderit quo
          voluptatum non at dolore libero nemo sint exercitationem voluptatem
          aliquam fuga?
        </Desc>
        <ContainerSocial>
          <Icon>
            <Facebook />
          </Icon>
          <Icon>
            <Instagram />
          </Icon>
          <Icon>
            <Twitter />
          </Icon>
        </ContainerSocial>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List className="List">
          <Item className="ListItem">Home</Item>
          <Item className="ListItem">Cart</Item>
          <Item className="ListItem">Clothes</Item>
          <Item className="ListItem">Shoes</Item>
          <Item className="ListItem">Watches</Item>
          <Item className="ListItem">Books</Item>
        </List>
      </Center>
      <Right className="Footer-Right">
        <Title className="Footer-Title">Contact</Title>
        <ContactItem className="Contact-Item">
          <Room style={{ marginRight: "10px" }} /> 234 Hello 133 BangBang
          Bangkok 10150
        </ContactItem>
        <ContactItem className="Contract-Item">
          <Phone style={{ marginRight: "10px" }} /> +66 093-424-5333
        </ContactItem>
        <ContactItem className="Contract-Item">
          <MailOutline style={{ marginRight: "10px" }} /> depvelop@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  background-color:#fff;
  ${mobile({flexDirection:"column"})}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display:"none"})}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor:"rgb(240, 240, 240)"})}
`;
const Logo = styled.div``;
const Desc = styled.div`
  margin: 20px 0px;
`;
const ContainerSocial = styled.div`
  display: flex;
  justify-content: center;
  ${mobile({justifyContent:"flex-start"})}
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  margin-left: 20px;
  cursor: pointer;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.li`
  width: 30%;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;
const ContactItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
