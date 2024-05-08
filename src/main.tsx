import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.tsx'
import './index.css'
import Dashboard from './Components/Dashboard.tsx'
import Signup from './Components/Signup.tsx'
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
      <Route path='/' element={< App/>} />
      <Route path='/Dashboard' element={< Dashboard/>} />
      <Route path='/signup' element={< Signup/>} />

  </Routes>
  </BrowserRouter>
)
