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
          <Route path="company" element={<Company />} />
          <Route path="company/detail/:id" element={<CompanyDetail />} />
          <Route path="user" element={<User />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="tickets" element={<Tickets />} />          
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
