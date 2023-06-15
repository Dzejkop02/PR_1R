import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { isExpired } from "react-jwt";
import Home from "./components/home";
import Posts from "./components/posts";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import SignUpForm from "./components/signUp";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}>
                  <Route path="home" element={<Home/>}/>
                  <Route path="posts" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/home"/> : <Posts/>}/>
                  <Route path="login" element={<LoginForm/>}/>
                  <Route path="signUp" element={<SignUpForm/>}/>
                  <Route
                      path="*"
                      element={
                          <NotFound/>
                      }
                  />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
