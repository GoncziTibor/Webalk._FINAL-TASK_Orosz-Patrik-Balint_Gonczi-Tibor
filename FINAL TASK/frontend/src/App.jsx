import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Orders from './pages/Orders';  // Importáld az Orders oldalt

import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders cart={cart} />} /> {/* Orders oldal hozzáadása és a kosár átadása */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
