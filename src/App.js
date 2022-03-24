import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Cart } from "./pages/Cart";
import HomePage from "./pages/Home";
import { Login } from "./pages/Login";
import { ProductDetail } from "./pages/ProductDetail";
import { ProductList } from "./pages/ProductList";
import { Register } from "./pages/Register";
import { MyProduct } from "./pages/MyProduct";
import { Customer } from "./pages/Customer";



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/products/:categotyName" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element= {<Login/>}
        ></Route>
        <Route path="/cart/:id" element={<Cart />}></Route>
        <Route path="/myProduct" element={<MyProduct/>}></Route>
        <Route path="/customer" element={<Customer/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
