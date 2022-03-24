import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../reponsive";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/login",
        requestOption
      );
      const data = await response.json();
      if (data.RESULT_CODE === "20000") {
        localStorage.setItem('token',data.data.accessToken);
        return navigate("/");
      }
    } catch (error) {}
  };
  return (
    <Container>
      <Navbar />
      <ContainerLogin>
        <Wrapper>
          <Title>SIGN UP</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <Button type="submit" className="Register-Btn">
              LOGIN
            </Button>
            <Link>DO NOT YOUR REMEMBER THE PASSWORD?</Link>
            <Link href="/register">CREATE NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </ContainerLogin>
      <Footer/>
    </Container>
  );
};
const Container = styled.div``;
const ContainerLogin = styled.div`
  width: 100vw;
  height: 70vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 30px 20px;
  background-color: #fff;
  box-shadow: 1px 1px rgba(143, 141, 141, 0.4);
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 350;

`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 50%;
  border: none;
  padding: 12px 20px;
  background-color: teal;
  color: #fff;
  cursor: pointer;
  margin: 10px 0px;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 10px;
`;
