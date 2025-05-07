import React from 'react';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const location = useLocation();  // A navigate-ben átadott adatokat itt kapjuk meg
  const { cart, total } = location.state || { cart: [], total: 0 };  // Ha nincs adat, akkor üres

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Rendelés áttekintése</h2>

      <div className="max-w-2xl mx-auto">
        {/* Kosár tartalom */}
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

            {/* Kosár összesen */}
            <div className="mt-4 text-right font-semibold text-lg">
              Összesen: {total.toLocaleString()} Ft
            </div>
          </>
        )}

        {/* Űrlap a rendeléshez */}
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Név</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Írd be a neved"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Írd be az email címed"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Szállítási cím</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Írd be a szállítási címet"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700">Telefonszám</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Írd be a telefonszámod"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Megrendelés gomb */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Megrendelem
          </button>
        </form>
      </div>
    </div>
  );
};

export default Orders;
