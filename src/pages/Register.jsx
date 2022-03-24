import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../reponsive";
import { Login } from "./Login";
import Swal from "sweetalert2";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const IP = "http://localhost:5000";
const API_URL = "/api/v1/merchant";
const initialCustomerState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialMerchantState = {
  merchantName: "",
  emailMerchant: "",
  passwordMerchant: "",
  confirmPasswordMerchant: "",
};

export const Register = () => {
  const [{ firstName, lastName, email, password, confirmPassword }, setState] =
    useState(initialCustomerState);
  const [
    { merchantName, emailMerchant, passwordMerchant, confirmPasswordMerchant },
    setMerchantState,
  ] = useState(initialMerchantState);
  const navigate = useNavigate();

  const clearState = () => {
    setState({ ...initialCustomerState });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    setMerchantState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitCustomer = async (event) => {
    event.preventDefault();
    try {
      if(password === confirmPassword){
        const requestOption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        };
        const response = await fetch(
          "http://localhost:5000/api/v1/customer",
          requestOption
        );
        const data = await response.json();
        if (data.RESULT_CODE === "20100") {
          Swal.fire("Success!", `Let's Go Login!`, "success").then((result) => {
            if (result.isConfirmed) {
              return navigate("/login");
            }
          });
        }
      }else{

      }
      
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitMerchant = async (event) => {
    event.preventDefault();
    try {
      if(passwordMerchant === confirmPassword){
        const requestOption = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchantName: merchantName,
            email: emailMerchant,
            password: passwordMerchant,
          }),
        };
        const response = await fetch(
          "http://localhost:5000/api/v1/merchant",
          requestOption
        );
        const data = await response.json();
        if (data.RESULT_CODE === "20100") {
          Swal.fire("Success!", `Let's Go Login!`, "success").then((result) => {
            if (result.isConfirmed) {
              return navigate("/login");
            }
          });
        }
      }else{

      }
    } catch (error) {
      console.log(error);
    }
  };

  // const checkPassword = () => {

  // };

  return (
    <Container>
      <Navbar />
      <ContainerLogin>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Tabs id="controlled-tab-example">
            <Tab eventKey="customer" title="Customer">
              <Form onSubmit={onSubmitCustomer}>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  placeholder="name"
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  placeholder="lastname"
                  required
                />
                <Input
                  type="email"
                  className="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="example.@gmail.com"
                  required
                />
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="password"
                  required
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="confirm password"
                  required
                />
                <Agreement className="Agreement">
                  By creating an account, I consent to the processing of my
                  personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button type="submit" value="submit" className="Register-Btn">
                  CREATE
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="merchant" title="Merchant">
              <Form onSubmit={onSubmitMerchant}>
                <Input
                  type="text"
                  name="merchantName"
                  value={merchantName}
                  onChange={onChange}
                  placeholder="Merchant Name"
                  required
                />
                <Input
                  type="email"
                  className="Email"
                  name="emailMerchant"
                  value={emailMerchant}
                  onChange={onChange}
                  placeholder="example.@gmail.com"
                  required
                />
                <Input
                  type="password"
                  name="passwordMerchant"
                  value={passwordMerchant}
                  onChange={onChange}
                  placeholder="password"
                  required
                />
                <Input
                  type="password"
                  name="confirmPasswordMerchant"
                  value={confirmPasswordMerchant}
                  onChange={onChange}
                  placeholder="confirm password"
                  required
                />
                <Agreement className="Agreement">
                  By creating an account, I consent to the processing of my
                  personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button type="submit" value="submit" className="Register-Btn">
                  CREATE
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Wrapper>
      </ContainerLogin>
      <Footer/>
    </Container>
  );
};
const Container = styled.div``
const ContainerLogin = styled.div`
  width: 100vw;
  height: 70vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 26px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;

  min-width: ${(props) => props.className === "Email" && "80%"};
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: #fff;
  cursor: pointer;
`;
