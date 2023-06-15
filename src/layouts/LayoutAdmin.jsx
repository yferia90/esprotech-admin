import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Preload from '../components/Preload';
import useAppContext from "../contexts/App.context";

const LayoutAdmin = () => {
  const [isloading, setIsLoading] = useState(true);
  const { token } = useAppContext();
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      setIsLoading(false);
    }   
  }, []);

  useEffect(() => {
    if (token === null) {
      return navigate('/');
    }
  }, [location]);

  if (isloading) {
    return (
      <Preload />
    )
  }

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
