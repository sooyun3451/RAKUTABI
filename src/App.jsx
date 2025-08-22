import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components';
import {
  Admin,
  Home,
  RestaurantDetail,
  RestaurantList,
  RestaurantRegion,
  RestaurantWrite,
  RoomDetail,
  RoomList,
  SignIn,
  SignUp,
} from './pages';

const Layout = () => {
  return (
    <div id="Layout">
      <Header />
      <Outlet />
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

            <Route
              path="/restaurant/detail/:id"
              element={<RestaurantDetail />}
            />

            <Route path="/restaurant/list/:id" element={<RestaurantList />} />

            <Route path="/restaurant/region" element={<RestaurantRegion />} />

            <Route path="/restaurant/write" element={<RestaurantWrite />} />

            <Route path="/room/detail/:id" element={<RoomDetail />} />

            <Route path="/room/list/:id" element={<RoomList />} />

            <Route path="/signIn" element={<SignIn />} />

            <Route path="/signUp" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
