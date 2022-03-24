import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import jwtDecode from "jwt-decode";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export const Customer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  let role;
  let Id;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
    Id = decoded.id;
  }
  useEffect(() => {
    getCutomer();
  }, []);
  const getCutomer = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/customer/${Id}`);
    const data = await response.json();
    if (data.RESULT_CODE === "20000") {
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      if (data.data.address !== null) {
        setAddress(data.data.address);
      }
    }
  };
  const handleUpdateCustomer = async () => {
    try {
      const requestOption = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
        }),
      };
      const response = await fetch(
        `http://localhost:5000/api/v1/customer/${Id}`,
        requestOption
      );
      const data = await response.json();
      if (data.RESULT_CODE === "20000") {
        Swal.fire("Success!", `Update Your Profile!`, "success").then((result) =>{
            if(result.isConfirmed){
                handleClose();
            }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Navbar id={Id} role={role} />
      <ContentContainer>
        <Header>
          <H2>MY PROFILE</H2>
        </Header>
        <Content>
          <InputGroup>
            <Span>Firstname</Span>
            <Input value={firstName} disabled></Input>
          </InputGroup>
          <InputGroup>
            <Span>Lastname</Span>
            <Input value={lastName} disabled></Input>
          </InputGroup>
          <InputGroup>
            <Span>Email</Span>
            <Input value={email} disabled></Input>
          </InputGroup>
          <InputGroup>
            <Span>Address</Span>
            <TextArea value={address} disabled></TextArea>
          </InputGroup>
          <Button
            type="button"
            onClick={() => {
              handleShow();
            }}
          >
            CHANGE
          </Button>
        </Content>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile Setting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup width="modal">
              <Span>Firstname</Span>
              <ModalInput
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></ModalInput>
            </InputGroup>
            <InputGroup width="modal">
              <Span>Lastname</Span>
              <ModalInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></ModalInput>
            </InputGroup>
            <InputGroup width="modal">
              <Span>Email</Span>
              <ModalInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></ModalInput>
            </InputGroup>
            <InputGroup width="modal">
              <Span>Address</Span>
              <ModalTextArea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></ModalTextArea>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="primary"
              onClick={() =>{handleUpdateCustomer()}}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </ContentContainer>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://images.unsplash.com/photo-1441984261150-55796ff52afc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1573&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;
const ContentContainer = styled.div`
  height: 70vh;
  width: 40vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
`;
const Header = styled.div`
  margin: 10px;
`;
const H2 = styled.h2`
  font-size: 22px;
  font-weight: 400;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  width: ${(props) => props.width === "modal" && "80"}%;
  justify-content: space-around;
  align-items: center;
  margin: 10px 20px;
`;
const Span = styled.span`
  font-size: 16px;
  font-weight: 300;
  width: 40%;
`;
const Input = styled.input`
  width: 60%;

  outline: none;
  border: none;
`;
const TextArea = styled.textarea`
  width: 60%;
  min-height: 40px;
  max-height: 80px;
  outline: none;
  border: none;
`;
const Button = styled.button`
  appearance: none;
  background-color: #000000;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin: 20px 0px 0px 0px;
  min-height: 40px;
  min-width: 0;
  outline: none;
  padding: 5px 18px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 60%;
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const ModalInput = styled.input`
  width: 60%;
`;
const ModalTextArea = styled.textarea`
  width: 60%;
`;
