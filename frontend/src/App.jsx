import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import AddContact from './components/AddContact';
import AllContacts from './components/AllContacts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<ProtectedRoute > <Dashboard /></ProtectedRoute>} />
          <Route path="/addContact" element={<ProtectedRoute > <AddContact /></ProtectedRoute>} />
          <Route path="/allContact" element={<ProtectedRoute > <AllContacts /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App