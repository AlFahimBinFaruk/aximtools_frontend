import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Footer from './common_components/Footer';
import Navbar from './common_components/Navbar';
import Home from './pages/Home';
import Details from "./pages/Details"
import Dashboard from './pages/Dashboard';
import Register from "./pages/Auth/Register"
import Login from './pages/Auth/Login';
import Alert from './common_components/Alert';
import RequireAuth from './common_components/Route/RequireAuth';
import Error from './pages/Error';
import Success from './pages/Payment/Success';
import Cancel from './pages/Payment/Cancel';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <MDBContainer className='my-5'>
          <Alert />

          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/details/:id' element={<RequireAuth>
              <Details />
            </RequireAuth>} />
            <Route path='/dashboard'
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/payment/success' element={<Success/>}/>
            <Route path='/payment/cancel' element={<Cancel/>}/>
            <Route path='*' element={<Error/>} />
          </Routes>

        </MDBContainer>
      </BrowserRouter>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
