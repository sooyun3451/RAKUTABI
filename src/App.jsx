import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Footer, Header } from './components';
import './css/reset.css';
import {
  Admin,
  Home,
  RestaurantDetail,
  RestaurantList,
  RestaurantRegion,
  RestaurantWrite,
  RestaurantUpdate,
  RoomDetail,
  RoomList,
  SignIn,
  SignUp,
  FindIdPw,
  CheckMyPage,
  EditMyPage
} from './pages';

const Layout = () => {
  return (
    <div id="Layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/restaurant/detail/:id" element={<RestaurantDetail />}/>
            <Route path="/restaurant/list" element={<RestaurantList />} />
            <Route path="/restaurant/region/:id" element={<RestaurantRegion />} />
            <Route path="/restaurant/write" element={<RestaurantWrite />} />
            <Route path="/restaurant/update" element={<RestaurantUpdate />} />
            <Route path="/room/detail/:id" element={<RoomDetail />} />
            <Route path="/room/list" element={<RoomList />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path='/find' element={<FindIdPw />} />
            <Route path='/myPage' element={<CheckMyPage />}/>
            <Route path='/myPage/edit' element={<EditMyPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
