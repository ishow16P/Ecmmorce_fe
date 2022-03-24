import React, { useEffect, useState } from "react";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState(props.role);
  const [id, setId] = useState(props.id);
  const [element, setElement] = useState(null);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    getItemCart();
    setMenuBar();
  }, [quantity]);
  const setMenuBar = () => {
    if (token) {
      if (role === "customer") {
        setElement(
          <Right>
            <Link to={`/cart/${id}`} style={{ textDecoration: "none" }}>
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
            <Link to={`/customer`} style={{ textDecoration: "none" }}>
              <MenuItem>CUSTOMER</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                isLogout();
              }}
            >
              LOGOUT
            </MenuItem>
          </Right>
        );
      } else {
        setElement(
          <Right>
            <Link to={`/myProduct`} style={{ textDecoration: "none" }}>
              <MenuItem>MY SHOP</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                isLogout();
              }}
            >
              LOGOUT
            </MenuItem>
          </Right>
        );
      }
    } else {
      setElement(
        <Right>
          <Link to={`/register`} style={{ textDecoration: "none" }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
        </Right>
      );
    }
  };
  const getItemCart = async () => {
    try {
      const decoded = jwtDecode(token);
      const id = decoded.id;
      const res = await fetch(`http://localhost:5000/api/v1/cart/${id}`);
      const data = await res.json();
      setQuantity(data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const isLogout = () => {
    localStorage.clear(); 
    navigate('/');
    window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input type="text" placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "18px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <Logo>IShow_.</Logo>
          </Link>
        </Center>
        {element}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  width: 100%;
  ${mobile({ padding: "10px 0px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;
const Left = styled.div`
  width: 33.3%;
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  width: 33.3%;
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  width: 33.3%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "0px" })}
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Logo = styled.h2`
  font-weight: bold;
  color: #000;
  ${mobile({ fontSize: "20px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: #000;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// if (decoded.role === "customer") {

// } else {

// }
// } else {

// }
