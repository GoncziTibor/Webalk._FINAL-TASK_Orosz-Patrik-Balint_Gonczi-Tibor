import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ showToast }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      console.log('Response:', response);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('token', response.data.token);
        showToast();

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.log('Hiba a bejelentkezéskor: ', response);
        setError('Hiba a bejelentkezés során!');
      }
    } catch (err) {
      console.log('Hiba történt: ', err.message);
      setError('Hibás email és/vagy jelszó!');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-72'>
        <h2 className='text-lg font-bold mb-4'>Bejelentkezés</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input
              type="email"
              placeholder='Add meg az email címed'
              className='w-full px-3 py-2 border'
              name="email"
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className='block text-gray-700'>Jelszó</label>
            <input
              type="password"
              placeholder='Add meg a jelszavad'
              className='w-full px-3 py-2 border'
              name="password"
              onChange={handleChanges}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2">Belépés</button>
        </form>
        <div className="text-center">
          <span>Nincs felhasználói fiókod? </span>
          <Link to='/register' className='text-blue-500'>Regisztráció</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
