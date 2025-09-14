import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios.js'
import toast from 'react-hot-toast';



function SignIn() {

  const [formData, setFormData] = useState({ email: '', password: '', first_name: '', last_name: '', phone: '', });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // get the navigate function

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });//Replace only the field that was typed in ([e.target.name]) with the new value.
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);


    console.log("VITE_LOGIN:", import.meta.env.VITE_LOGIN);
    try {

      const res = await api.post('/login', {
        email: formData.email,
        password: formData.password
      });

      // Login successful (HTTP 2xx)
      if (res.data.authToken) {
        localStorage.setItem('token', res.data.authToken);
        navigate('/home');

        setTimeout(() => {
          toast.success('Successfully Logged In!')
        }, 500);

      }
    }

    catch (error) {
      toast.error('Invalid Credentials')
    }

    finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="max-w-[35em] h-auto mx-auto m-12 bg-white flex flex-col border rounded-xl text-center shadow-xl p-5 mb-5">
      <div className="mt-6">
        <h1 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-3xl font-bold">ELAVIEW</h1>
      </div>

      <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
      <p className="text-gray-500 mt-2">Enter your email and password to continue</p>

      <form onSubmit={handleLogin} className="p-6">

        {/*Email*/}
        <div className="mt-5 flex flex-col">
          <label className="text-gray-600 font-semibold" htmlFor="email">Email</label>
          <input id="email" className="border-2 p-3 rounded mt-2 focus:border-purple-500 focus:outline-none transition-colors duration-300 focus:shadow-lg"
            type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required disabled={isLoading} />
        </div>

        {/*Password*/}
        <div className="mt-5 flex flex-col">
          <label className="text-gray-600 font-semibold" htmlFor="password">Password</label>
          <input id="password" className="border-2 p-3 rounded mt-2 focus:border-purple-500 focus:outline-none transition-colors duration-300 focus:shadow-lg"
            type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required disabled={isLoading} />
        </div>

        {/*Signin Button*/}
        <button type="submit" className="bg-indigo-400/60 text-gary-800 font-semibold w-full rounded p-3 mt-5" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

      </form>

    </div>
  );
}

export default SignIn;
