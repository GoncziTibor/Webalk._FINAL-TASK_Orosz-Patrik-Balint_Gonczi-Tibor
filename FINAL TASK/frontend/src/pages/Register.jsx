import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ showToast }) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values);
      if (response.status === 201) {
        showToast();
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg px-8 py-5 border w-72'>
        <h2 className='text-lg font-bold mb-4'>Regisztráció</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className='block text-gray-700'>Felhasználónév</label>
            <input
              type="text"
              placeholder='Add meg a felhasználóneved'
              className='w-full px-3 py-2 border'
              name="username"
              onChange={handleChanges}
            />
          </div>
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
          <button className="w-full bg-green-600 text-white py-2">Regisztráció</button>
        </form>
        <div className="text-center">
          <span>Van már fiókod? </span>
          <Link to='/login' className='text-blue-500'>Bejelentkezés</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
