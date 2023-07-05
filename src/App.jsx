import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Home from "./pages/admin/Home";
import Profile from "./pages/admin/Profile";
import EditUser from './pages/base/UserEdit';
import Company from './pages/base/Company';
import CompanyDetail from './pages/base/CompanyDetail';
import Error404 from "./pages/Error404";
import Tickets from "./pages/admin/Tickets";
import User from './pages/base/User';
import Application from './pages/base/Application';
import Group from './pages/base/Group';
import Customer from './pages/sale/Customer';
import OrderSale from './pages/sale/OrderSale';
import Category from './pages/stock/Category';
import Product from './pages/stock/Product';
import Store from './pages/stock/Store';
import IncomingMove from './pages/stock/IncomingMove';
import ExitMove from './pages/stock/ExitMove';
import Supplier from './pages/purchase/Supplier';
import OrderPurchase from './pages/purchase/OrderPurchase';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/olvide-password" element={<ForgetPassword />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="config/company" element={<Company />} />
          <Route path="config/company/detail/:id" element={<CompanyDetail />} />
          <Route path="config/user" element={<User />} />
          <Route path="config/user/edit/:id" element={<EditUser />} />
          <Route path="config/application" element={<Application />} />
          <Route path="config/group" element={<Group />} />
          <Route path="sale/customer" element={<Customer />} />
          <Route path="sale/sale" element={<OrderSale />} />
          <Route path="stock/category" element={<Category />} />
          <Route path="stock/product" element={<Product />} />
          <Route path="stock/store" element={<Store />} />
          <Route path="stock/incoming/move" element={<IncomingMove />} />
          <Route path="stock/exit/move" element={<ExitMove />} />
          <Route path="purchase/supplier" element={<Supplier />} />
          <Route path="purchase/purchase" element={<OrderPurchase />} />
          <Route path="tickets" element={<Tickets />} />          
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
