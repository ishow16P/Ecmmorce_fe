import { Add, DeleteOutline, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { mobile } from "../reponsive";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export const Cart = () => {
  const [itemCart, setItemCart] = useState([]);
  const [show, setShow] = useState(false);
  const [customer,setCustomer] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let total = 0;
  let role;
  let Id;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
    Id = decoded.id;
  }
  useEffect(() => {
    authentication();
    getItemCart();
    getCustomer();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authentication = async () => {
    if (!token) {
      navigate("/register");
    }
  };
  const updateQuantity = async (id, quantity, option) => {
    try {
      if (option === "increase") {
        quantity += 1;
      } else {
        quantity -= 1;
      }
      if (quantity === 0) return;
      const requestOption = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: quantity }),
      };
      const response = await fetch(
        `http://localhost:5000/api/v1/cart/${id}`,
        requestOption
      );
      const data = await response.json();
      if (data.RESULT_CODE === "20000") {
        getItemCart();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getItemCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/cart/${Id}`);
      const data = await res.json();
      setItemCart(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomer = async () =>{
    try {
      const res = await fetch(`http://localhost:5000/api/v1/customer/${Id}`);
      const data = await res.json();
      setCustomer(data.data);
    } catch (error) {
      
    }
  }
  const handleRemoveItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/cart/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.RESULT_CODE === "20000") {
        getItemCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const itemElements = itemCart.map((item) => {
    let sum = item.productId.price * item.quantity;
    total = total += sum;
    return (
      <Product key={item._id}>
        <ProductDetail>
          <Image src={item.productId.productImage} alt="" />
          <Details>
            <ProductName>
              <b>Product:</b>
              {item.productId.productName}
            </ProductName>
            <ProductId>
              <b>ID:</b> {item.productId._id}
            </ProductId>
          </Details>
        </ProductDetail>
        <ProductDetail>
          <PriceDetail>
            <ProductAmountContainer>
              <ContainerIcon
                onClick={() =>
                  updateQuantity(item._id, item.quantity, "increase")
                }
              >
                <Add />
              </ContainerIcon>
              <ProductAmount>{item.quantity}</ProductAmount>
              <ContainerIcon
                onClick={() =>
                  updateQuantity(item._id, item.quantity, "decrease")
                }
              >
                <Remove />
              </ContainerIcon>
            </ProductAmountContainer>
            <ProductPrice>฿ {item.productId.price}</ProductPrice>
          </PriceDetail>
          <TrashIconContainer
            onClick={() => {
              handleRemoveItem(item._id);
            }}
          >
            <DeleteOutline />
          </TrashIconContainer>
        </ProductDetail>
      </Product>
    );
  });

  const orderElement = itemCart.map((item) => {
    let subTotal = item.productId.price * item.quantity;
    return (
      <Tr>
        <Td align="left" item="product">
          <ImageItemOrder src={item.productId.productImage} alt="" />
          <span>{item.productId.productName}</span>
        </Td>
        <Td>
          <p>฿ {item.productId.price}</p>
        </Td>
        <Td>
          <p>{item.quantity}</p>
        </Td>
        <Td>
          <p>฿ {subTotal}</p>
        </Td>
      </Tr>
    );
  });

  const handlePlaceOrder = async () => {
    try {
      if (itemCart.length !== 0) {
        const requestOptionOrder = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: Id,
          }),
        };
        const response = await fetch(
          "http://localhost:5000/api/v1/order",
          requestOptionOrder
        );
        const data = await response.json()
        const orderId = data.data._id;
        if (data.RESULT_CODE === "20100") {
          itemCart.map(async (item,index) => {
            let subTotal = item.productId.price * item.quantity;
            const requestOption = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: orderId,
                productId: item.productId._id,
                quantity: item.quantity,
                totalPrice: subTotal,
              }),
            };
            const response = await fetch(
              "http://localhost:5000/api/v1/orderDetail",
              requestOption
            );
            const result = await response.json();
          });

          const res = await fetch(`http://localhost:5000/api/v1/cart/itemCart/${Id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if(data.RESULT_CODE === "20000"){
            Swal.fire({
              title: 'Success',
              text: 'Successful Purchase.',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            }).then(()=>{
              getItemCart();
              handleClose();
            })
          }
        }
      }
    } catch (error) {}
  };

  return (
    <Container>
      <Navbar id={Id} role={role} />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>CONTNUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({itemCart.length})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton
            type="filled"
            onClick={() => {
              handleShow();
            }}
          >
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>{itemElements}</Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryText>Subtotal</SummaryText>
              <SummaryPrice>฿ {total}</SummaryPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Estimated Shipping</SummaryText>
              <SummaryPrice>฿ 60</SummaryPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryText>Shipping Discount</SummaryText>
              <SummaryPrice>฿ -60</SummaryPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryText>Total</SummaryText>
              <SummaryPrice>฿ {total}</SummaryPrice>
            </SummaryItem>
            <Button
              onClick={() => {
                handleShow();
              }}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <ModalStyled
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size={"lg"}
      >
        <Modal.Header closeButton>
          <Modal.Title>CHECKOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BodyContainer>
            <AddressContainer>Delivery Address
              <Address>{customer.address}</Address>
            </AddressContainer>
            <ProductContainer>
              Products Ordered
              <ProductTable>
                <Tr>
                  <Th align="left" item="product">
                    Name
                  </Th>
                  <Th>Unit Price</Th>
                  <Th>Amount</Th>
                  <Th>Item Subtotal</Th>
                </Tr>
                {orderElement}
                <Tr>
                  <Td align="left"></Td>
                  <Td></Td>
                  <Td align="rigth">Shipping Discount</Td>
                  <Td>
                    <p>฿ -60</p>
                  </Td>
                </Tr>
                <Tr>
                  <Td align="left"></Td>
                  <Td></Td>
                  <Td align="rigth">Order Total</Td>
                  <Td>
                    <Span>฿ {total}</Span>
                  </Td>
                </Tr>
              </ProductTable>
            </ProductContainer>
          </BodyContainer>
        </Modal.Body>
        <ModalFooterStyled>
          <Button
            Order="order-btn"
            variant="primary"
            onClick={() =>{handlePlaceOrder()}}
          >
            Place Order
          </Button>
        </ModalFooterStyled>
      </ModalStyled>
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 400;
  text-align: center;
  margin-top: 20px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  border: ${(porps) => porps.type === "filled" && "none"};
  background-color: ${(porps) =>
    porps.type === "filled" ? "black" : "transparent"};
  color: ${(porps) => porps.type === "filled" && "#fff"};
  &:hover {
    background-color: ${(porps) => porps.type === "filled" && "#2c2c2c"};
  }
  ${mobile({ padding: "5px" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  padding: 0 2%;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 260px;
`;
const Details = styled.div`
  margin: 0px 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  font-size: 18px;
  font-weight: 400;
`;
const ProductId = styled.span`
  font-size: 18px;
  font-weight: 400;
`;
const MerchantName = styled.span`
  font-size: 18px;
  font-weight: 400;
`;
const TrashIconContainer = styled.div`
  height: 30px;
  position: relative;
  top: 0;
  right: 0;
  margin: 5px 10px;
  cursor: pointer;
`;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "20px 0px" })}
`;
const ContainerIcon = styled.div`
  cursor: pointer;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 120px;
  justify-content: space-around;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0px 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #000;
  border: none;
  height: 2px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 400px;
  position: relative;
`;
const SummaryTitle = styled.h1`
  font-size: 28px;
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(porps) => porps.type === "total" && "500"};
  font-size: ${(porps) => porps.type === "total" && "24px"};
`;
const SummaryText = styled.span``;
const SummaryPrice = styled.span``;
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
  font-weight: 600;
  line-height: normal;
  min-height: 40px;
  min-width: 0;
  outline: none;
  margin: 0px auto;
  padding: 5px 18px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;

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

const ModalStyled = styled(Modal)``;
const ModalFooterStyled = styled(Modal.Footer)`
  height: 60px;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;
const AddressContainer = styled.div`
  height: 80px;
`;
const ProductContainer = styled.div`
  height: auto;
`;

const ProductTable = styled.table`
  display: flex;
  flex-direction: column;
`;
const Tr = styled.tr`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const Th = styled.th`
  width: 23.33%;
  width: ${(props) => props.item === "product" && "30"}%;
  text-align: center;
  text-align: ${(props) => props.align === "left" && "left"};
`;
const Td = styled.td`
  width: 23.33%;
  width: ${(props) => props.item === "product" && "30"}%;
  text-align: center;
  text-align: ${(props) => props.align === "left" && "left"};
`;
const ImageItemOrder = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 700;
`;
const Address = styled.p`
  margin: 0 auto 0 10px;
  font-size: 16px;
  font-weight: 500;
`