import React, { useEffect, useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Newletter } from "../components/Newletter";
import cloth9 from "../images/products/clothes/9.jpg";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

export const ProductDetail = () => {
  const location = useLocation();
  const proId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const token = localStorage.getItem("token");
  let role;
  let Id;
  if(token){
    const decoded = jwtDecode(token)
    role = decoded.role;
    Id = decoded.id;
  }
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  });

  const getProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/product/${proId}`);
      const data = await res.json();
      setProduct(data.data);
    } catch (error) {}
  };

  const addItemCart = async () => {
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
              quantity: amount,
            }),
          };
          const response = await fetch(
            "http://localhost:5000/api/v1/cart",
            requestOption
          );
          const data = await response.json();
          if (data.RESULT_CODE === "20100") {
            Swal.fire("Success!", `Add to Cart`, "success");
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

  const handleClick = async(e) =>{
    if(e === "add"){
      setAmount(amount+1)
    }else{
      if(amount <= 1) return
      setAmount(amount-1)
    }
  }
  return (
    <Container className="Container-ProductDetail">
      <Navbar id={Id} role={role}/>
      <Wrapper>
        <ImgContainer>
          <Img src={product.productImage} alt="" />
        </ImgContainer>
        <Info>
          <Title>{product.productName}</Title>
          <Desc>{product.description}</Desc>
          <Price>฿ {product.price}</Price>
          <AddContainer>
            <ContainerAmount>
              <Icon onClick={() => {handleClick("remove")}}>
                <Remove />
              </Icon>
              <Amount>{amount}</Amount>
              <Icon onClick={() => {handleClick("add")}}>
                <Add />
              </Icon>
            </ContainerAmount>
            <Button onClick={() =>addItemCart()}>ADD TO CART</Button>
          </AddContainer>
        </Info>
      </Wrapper>
      <Newletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div`
  height: auto;
  padding: 50px 10%;
  display: flex;
  margin-bottom: 20px;
  ${mobile({ padding: "20px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  max-width: 50%;
  min-width: 320px;
  height: auto;
  object-fit: cover;
  ${mobile({ height: "40vh", widrh: "80vw" })}
`;
const Info = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ marginTop: "20px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const AddContainer = styled.div`
  width: 40%;
  display: block;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%", marginTop: "20px" })}
`;
const ContainerAmount = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top: 20px;
  ${mobile({ justifyContent: "space-around" })}
`;
const Icon = styled.div`
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-size: 18px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.1s ease;
  margin-top: 20px;
  ${mobile({ width: "100%" })}

  &:hover {
    background-color: #f8f4f4;
  }
`;
