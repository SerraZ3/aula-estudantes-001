import React from "react";
import { Route, Routes as ReactRoutes } from "react-router";

// import { Container } from './styles';

function Routes() {
  return (
    <ReactRoutes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route>
    </ReactRoutes>
  );
}

export default Routes;
