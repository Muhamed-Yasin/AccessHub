import React from 'react';
import UserCreate from './UserCreate';
import EditForm from './UserEdit';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserListing from './UserListing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListing />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path='/user/edit/:userid' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
