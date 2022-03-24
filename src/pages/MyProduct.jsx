import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import cloth from "../images/products/clothes/2.jpg";
import jwtDecode from "jwt-decode";
import { Modal } from "react-bootstrap";

const initialProduct = {
  categoryId: "",
  productName: "",
  description: "",
};

export const MyProduct = () => {
  const token = localStorage.getItem("token");
  let role;
  let Id;
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
    Id = decoded.id;
  }
  const [category, setCategory] = useState([]);
  const [{ categoryId, productName, description }, setState] =
    useState(initialProduct);
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [productImg, setProductImg] = useState(null);
  const [image, setImage] = useState(
    "https://ujian.unsia.ac.id/cbtfront/img/default100.jpg"
  );
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);

  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductDesc, setUpdateProductDesc] = useState("");
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateImage, setUpdateImage] = useState("");
  const [showProductUpdate, setShowProductUpdate] = useState(null);
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [changeImage, setChangeImage] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (Id) => {
    setShow(true);
    getProductById(Id);
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  const getProduct = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/product/myshop/${Id}`
    );
    const data = await response.json();
    setProduct(data.data);
  };
  const getCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/category?sort=categoryName"
      );
      const data = await response.json();
      setCategory(data.data.category);
    } catch (error) {}
  };

  const getProductById = async (Id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/${Id}`
      );
      const data = await response.json();
      console.log(data);
      setUpdateProductId(data.data._id);
      setUpdateProductName(data.data.productName);
      setUpdateProductDesc(data.data.description);
      setUpdatePrice(data.data.price);
      setUpdateImage(data.data.productImage);
      setUpdateQuantity(data.data.quantity);
      setShowProductUpdate(data.data.productImage);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("fileupload", productImg);
      const res = await fetch("http://localhost:5000/api/v1/upload", {
        method: "POST",
        body: formData,
      });
      const urlImg = await res.json();
      setProductImg(urlImg.path);
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: categoryId,
          merchantId: Id,
          productName: productName,
          description: description,
          productImage: urlImg.path,
          price: price,
          quantity: quantity,
        }),
      };
      const response = await fetch(
        "http://localhost:5000/api/v1/product",
        requestOption
      );
      const data = await response.json();
      console.log(data);
      if (data.RESULT_CODE === "20100") {
        Swal.fire("Success!", `Add Product Successfully`, "success");
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveUpdateProduct = async () => {
    try {
      let requestOption;
      if (changeImage === true) {
        const formData = new FormData();
        formData.append("fileupload", updateImage);
        const res = await fetch("http://localhost:5000/api/v1/upload", {
          method: "POST",
          body: formData,
        });
        const urlImg = await res.json();
        setUpdateImage(urlImg.path);
        requestOption = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: updateProductName,
            description: updateProductDesc,
            price: updatePrice,
            productImage: urlImg.path,
            quantity: updateQuantity,
          }),
        };
      } else {
        requestOption = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: updateProductName,
            description: updateProductDesc,
            price: updatePrice,
            quantity: updateQuantity,
          }),
        };
      }
      const response = await fetch(
        `http://localhost:5000/api/v1/product/${updateProductId}`,
        requestOption
      );
      const data = await response.json();
      if (data.RESULT_CODE === "20000") {
        Swal.fire("Success!", `Update Your Product!`, "success").then(
          (result) => {
            if (result.isConfirmed) {
              getProduct();
              handleClose();
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(categoryId);
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const selletProduct = async (id) => {
    const reqeustOption = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:5000/api/v1/product/${id}`,
      reqeustOption
    );
    const result = await response.json();
    if (result.RESULT_CODE === "20000") {
      getProduct();
    }
  };

  const categorySelect = category.map((item, index) => {
    return (
      <Option value={item._id} key={item._id}>
        {item.categoryName}
      </Option>
    );
  });

  const onSelectFile = (e) => {
    if (e.target.files) {
      let files = e.target.files;
      var render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.onload = (event) => {
        setImage(event.target.result);
      };
      setProductImg(files[0]);
    }
  };

  const onSelectFileModal = (e) => {
    if (e.target.files) {
      let files = e.target.files;
      var render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.onload = (event) => {
        setShowProductUpdate(event.target.result);
      };
      setUpdateImage(files[0]);
      setChangeImage(true);
    }
  };

  const dataTable = product.map((item, index) => {
    return (
      <Tr key={item._id}>
        <Td align="center">{index + 1}</Td>
        <Td align="center">
          <ImgProductData src={item.productImage} alt="" />
        </Td>
        <Td>{item.productName}</Td>
        <Td>{item.price}</Td>
        <Td>{item.quantity}</Td>
        <Td align="center">
          <BtnOption
            btn="edit"
            onClick={() => {
              handleShow(item._id);
            }}
          >
            Edit
          </BtnOption>
          <BtnOption onClick={() => selletProduct(item._id)}>Del</BtnOption>
        </Td>
      </Tr>
    );
  });
  return (
    <Container>
      <Navbar id={Id} role={role} />
      <Wrapper>
        <Top>
          <TitleContainer>
            <Title>MY PRODUCT</Title>
          </TitleContainer>
          <FormInfo>
            <Left>
              <Img src={image} alt="" />
              <Upload type="file" name="file" onChange={onSelectFile} />
            </Left>
            <Right>
              <Info>
                <Text>Catagory</Text>
                <Select
                  name="categoryId"
                  value={categoryId}
                  onChange={onChange}
                  defaultValue={category[0]}
                >
                  {categorySelect}
                </Select>
              </Info>
              <Info>
                <Text>Product Name</Text>
                <Input
                  name="productName"
                  value={productName}
                  onChange={onChange}
                />
              </Info>
              <Info>
                <Text>Description</Text>
                <Input
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </Info>
              <Info>
                <Text>Price</Text>
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  numberic="numberic"
                  min="1"
                  max="99999999"
                />
              </Info>
              <Info>
                <Text>Quantity</Text>
                <Input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  numberic="numberic"
                  min="1"
                  max="999"
                />
              </Info>
              <Button
                type="submit"
                onClick={() => {
                  onSubmit();
                }}
              >
                ADD
              </Button>
            </Right>
          </FormInfo>
        </Top>
        <Bottom>
          <Table striped bordered hover>
            <thead>
              <Tr>
                <Th align="center">#</Th>
                <Th>Product</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th></Th>
              </Tr>
            </thead>
            <tbody>{dataTable}</tbody>
          </Table>
        </Bottom>
      </Wrapper>
      <Footer />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContaienrImgUpdate>
            <ImageUpdate src={showProductUpdate} alt="" />
            <Upload type="file" name="file" onChange={onSelectFileModal} />
          </ContaienrImgUpdate>
          <InputGroup width="modal">
            <Span>ProductName</Span>
            <ModalInput
              value={updateProductName}
              onChange={(e) => {
                setUpdateProductName(e.target.value);
              }}
            ></ModalInput>
          </InputGroup>
          <InputGroup width="modal">
            <Span>Description</Span>
            <ModalInput
              value={updateProductDesc}
              onChange={(e) => {
                setUpdateProductDesc(e.target.value);
              }}
            ></ModalInput>
          </InputGroup>
          <InputGroup width="modal">
            <Span>Price</Span>
            <ModalInput
              value={updatePrice}
              type="number"
              onChange={(e) => {
                setUpdatePrice(e.target.value);
              }}
            ></ModalInput>
          </InputGroup>
          <InputGroup width="modal">
            <Span>Quantity</Span>
            <ModalInput
              value={updateQuantity}
              onChange={(e) => {
                setUpdateQuantity(e.target.value);
              }}
            ></ModalInput>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="modal"
            onClick={() => {
              saveUpdateProduct();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("https://images.unsplash.com/photo-1572611932849-7f0f116fb2f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Top = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;
const Bottom = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  width: 70vw;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const TitleContainer = styled.div`
  height: 30px;
  margin: 20px 5%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;
const FormInfo = styled.form`
  margin: 0px 2%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Left = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Img = styled.img`
  width: 240px;
  height: 300px;
  border-radius: 10%;
`;
const Upload = styled(Form.Control)`
  width: 50%;
  margin-top: 10px;
`;
const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px;
`;
const Text = styled.span`
  font-size: 18px;
  font-weight: 300;
  margin-right: 20px;
  width: 120px;
`;
const Select = styled.select`
  padding: 5px;
`;
const Option = styled.option`
  margin: 5px;
`;
const Input = styled.input`
  padding: 5px;
  font-size: 16px;
  width: 250px;
  width: ${(props) => props.numberic === "numberic" && "120px"};
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
  font-weight: 600;
  line-height: normal;
  margin: 10px 0px 0px 0px;
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
  width: 80%;
  width: ${(props) => props.variant === "modal" && "100"}%;
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
const ImgProductData = styled.img`
  width: 55px;
  height: 70px;
`;
const Tr = styled.tr``;
const Th = styled.th`
  text-align: ${(props) => props.align === "center" && "center"};
`;
const Td = styled.td`
  text-align: ${(props) => props.align === "center" && "center"};
`;
const BtnOption = styled.button`
  display: block;
  width: 50%;
  appearance: none;
  background-color: #000000;
  background-color: ${(props) => props.btn === "edit" && "#fff"};
  border: 2px solid #1a1a1a;
  border: ${(props) => props.btn === "edit" && "2px solid #fff"};
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  color: ${(props) => props.btn === "edit" && "#000"};
  cursor: pointer;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin: 5px 0px 0px 0px;
  min-height: 30px;
  min-width: 0;
  outline: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
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

const ContaienrImgUpdate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const ImageUpdate = styled.img`
  width: 90px;
  height: 110px;
  margin-bottom: 10px;
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
const ModalInput = styled.input`
  width: 60%;
`;
