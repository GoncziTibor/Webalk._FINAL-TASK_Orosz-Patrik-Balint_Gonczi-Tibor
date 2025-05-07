import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = ({showToast}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 };
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status !== 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Auth error:', err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    showToast();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('Ez egy demó oldal, nem lehet rendelni.');
  };

  const handleBackToHome = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Rendelés</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Kijelentkezés
        </button>
      </header>

      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Rendelés áttekintése</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">A kosár üres.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{item.name} – {item.size} – <span className="font-medium">{item.price.toLocaleString()} Ft</span></span>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right font-semibold text-lg">
              Összesen: {total.toLocaleString()} Ft
            </div>
          </>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700">Név</label>
            <input type="text" id="name" name="name" placeholder="Írd be a neved"
              className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" placeholder="Írd be az email címed"
              className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Szállítási cím</label>
            <input type="text" id="address" name="address" placeholder="Írd be a szállítási címet"
              className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700">Telefonszám</label>
            <input type="tel" id="phone" name="phone" placeholder="Írd be a telefonszámod"
              className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Megrendelem
          </button>
        </form>

        <button
          onClick={handleBackToHome}
          className="mt-6 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Vissza a főoldalra
        </button>
      </div>
    </div>
  );
};

export default Orders;
