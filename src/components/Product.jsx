import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../reponsive";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

export const Product = (props) => {
  const { item, key } = props;

  const token = localStorage.getItem("token");
  let role;
  let Id;
  if(token){
    const decoded = jwtDecode(token)
    role = decoded.role;
    Id = decoded.id;
  }
  const navigate = useNavigate();

  const addItemCart = async (proId) => {
    if (token) {
      if (role !== "customer") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not a Customer.!",
        });
      } else {
        try {
          const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: proId,
              customerId: Id,
              quantity: 1,
            }),
          };
          const response = await fetch(
            "http://localhost:5000/api/v1/cart",
            requestOption
          );
          const data = await response.json();
          if (data.RESULT_CODE === "20100") {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Success!',
              text: 'Add to Cart.',
              showConfirmButton: true,
              timer: 1500
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      Swal.fire("You must be logged in.", "Go to Login Page!", "Info").then(
        (result) => {
          if (result.isConfirmed) {
            return navigate("/login");
          }
        }
      );
    }
  };
  return (
    <Continer>
      <Circle></Circle>
      <Img src={item.productImage} alt="" />
      <InfoContainer>
        <Icon
          onClick={() => {
            addItemCart(item._id);
          }}
        >
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{ color: "#000" }}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </InfoContainer>
    </Continer>
  );
};

const InfoContainer = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Continer = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 320px;
  height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ minWidth: "100%" })}

  &:hover ${InfoContainer} {
    opacity: 1;
    transition: all 0.5s ease;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
`;
const Img = styled.img`
  height: 70%;
  z-index: 2;
  ${mobile({ width: "70vw" })}
`;
const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
