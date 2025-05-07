import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import leMaleImg from '../pictures/lemale.jpg';
import classiqueImg from '../pictures/classique.jpg';
import paradisegardenImg from '../pictures/paradisegarden.jpg';
import labelleImg from '../pictures/labelle.jpg';

const perfumes = [
  {
    id: 1,
    name: "Jean Paul Gaultier Le Male Le Parfum EDP",
    image: leMaleImg,
    sizes: [
      { size: "75ml", price: 33790 },
      { size: "125ml", price: 49480 },
    ]
  },
  {
    id: 2,
    name: "Jean Paul Gaultier Classique EDP",
    image: classiqueImg,
    sizes: [
      { size: "30ml", price: 24510 },
      { size: "50ml", price: 34590 }
    ]
  },
  {
    id: 3,
    name: "Jean Paul Gaultier Le Beau Paradise Garden EDP",
    image: paradisegardenImg,
    sizes: [
      { size: "75ml", price: 34590 },
      { size: "125ml", price: 47280 },
    ]
  },
  {
    id: 4,
    name: "Jean Paul Gaultier La Belle EDP",
    image: labelleImg,
    sizes: [
      { size: "30ml", price: 23730 },
      { size: "50ml", price: 33400 },
      { size: "100ml", price: 66690 }
    ]
  }
];

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/login');
      console.error('Auth error:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const addToCart = (product, sizeOption) => {
    const item = {
      id: `${product.id}-${sizeOption.size}`,
      name: product.name,
      size: sizeOption.size,
      price: sizeOption.price,
    };
    setCart([...cart, item]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleOrderClick = () => {
    navigate('/orders', { state: { cart, total } });
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">ParfümVilág</h1>
        <div className="relative cursor-pointer text-2xl" onClick={toggleCart}>
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {isCartOpen && (
        <div className="absolute right-6 top-20 w-80 bg-white shadow-lg rounded-xl p-4 z-20 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">Kosár</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">A kosár üres.</p>
          ) : (
            <>
              <ul className="space-y-2 text-sm">
                {cart.map((item, index) => (
                  <li key={index} className="border-b pb-1 flex justify-between items-center">
                    <span>{item.name} – {item.size} – <span className="font-medium">{item.price.toLocaleString()} Ft</span></span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right font-semibold text-lg">
                Összesen: {total.toLocaleString()} Ft
              </div>
              <button
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                onClick={handleOrderClick}
              >
                Megrendelem
              </button>
              <button
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                onClick={clearCart}
              >
                Kosár ürítése
              </button>
            </>
          )}
        </div>
      )}

      <main className="p-6">
        <div className="text-center my-10">
          <h2 className="text-4xl font-bold text-gray-800">Jean Paul Gaultier Kollekció</h2>
          <p className="text-lg text-gray-600 mt-2">Válassz kiszerelést és tedd kosárba kedvenc illatod!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="bg-white rounded-2xl shadow-md p-4 text-center">
              <img src={perfume.image} alt={perfume.name} className="mx-auto mb-4 rounded-xl h-64 object-cover" />
              <h3 className="text-xl font-semibold">{perfume.name}</h3>
              <div className="mt-3 flex justify-center space-x-3 flex-wrap gap-2">
                {perfume.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => addToCart(perfume, size)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition text-sm"
                  >
                    {size.size} – {size.price.toLocaleString()} Ft
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
