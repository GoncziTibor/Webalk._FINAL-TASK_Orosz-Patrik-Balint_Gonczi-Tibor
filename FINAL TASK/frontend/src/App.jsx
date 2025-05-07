import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Orders from './pages/Orders';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cart, setCart] = useState([]);

  const showToast = (message) => {
    toast.success(message);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} showToast={() => showToast('Sikeres kilépés!')}/>} />
        <Route 
          path="/register" 
          element={<Register showToast={() => showToast('Sikeres regisztráció!')} />}
        />
        <Route 
          path="/login" 
          element={<Login showToast={() => showToast('Sikeres bejelentkezés!')} />}
        />
        <Route path="/orders" element={<Orders cart={cart} showToast={() => showToast('Sikeres kilépés!')}/>} />
      </Routes>
      
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={true} 
        closeOnClick={false} 
        pauseOnHover={false} 
        draggable={false} 
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;