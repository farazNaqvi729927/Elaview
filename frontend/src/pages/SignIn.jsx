import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios.js'
import toast from 'react-hot-toast';
import signin from '../assets/signin.jpg'



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


    // console.log("VITE_LOGIN:", import.meta.env.VITE_LOGIN);
    try {

      const res = await api.post(import.meta.env.VITE_LOGIN, {
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

    <div className="flex justify-center p-8">
      
      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-w-[70em] max-lg:max-w-[35em] w-full bg-white border rounded-xl shadow-xl overflow-hidden">

        {/* Left Image */}
        <div >
          <img className="w-full object-cover max-lg:hidden" src={signin} alt="" />
        </div>

        {/* Right Form */}
        <div className=" flex flex-col justify-center p-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-3xl font-bold">ELAVIEW</h1>

          <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="text-gray-500 mt-2">Enter your email and password to continue</p>

          <form onSubmit={handleLogin} className="p-6">
            {/* Email */}
            <div className="mt-5 flex flex-col">
              <label className="text-gray-600 font-semibold" htmlFor="email">Email</label>
              <input id="email" className="border-2 p-3 rounded mt-2 focus:border-purple-500 focus:outline-none transition-colors duration-300 focus:shadow-lg"
                type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required disabled={isLoading} />
            </div>

            {/* Password */}
            <div className="mt-5 flex flex-col">
              <label className="text-gray-600 font-semibold" htmlFor="password">Password</label>
              <input id="password" className="border-2 p-3 rounded mt-2 focus:border-purple-500 focus:outline-none transition-colors duration-300 focus:shadow-lg"
                type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required disabled={isLoading} />
            </div>

            {/* Signin Button */}
            <button type="submit" className="bg-indigo-400/60 text-gray-800 font-semibold w-full rounded p-3 mt-5" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className='text-gray-800'>
            Don't have an account? <Link className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" to="/signup">Signup</Link>
          </p>
        </div>

      </div>
    </div>


  );
}

export default SignIn;
