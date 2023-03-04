import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Routes>
          <Route element={
              <PrivateRoute>
                  <Home/>
              </PrivateRoute    >
          }
          path="/"
          />
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path={"/register"}/>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
