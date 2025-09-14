import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios.js'
import toast from 'react-hot-toast';



function SignUp() {

  const [formData, setFormData] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // get the navigate function

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });//Replace only the field that was typed in ([e.target.name]) with the new value.
  };


  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.cpassword) {
      toast.error('Password do not Match')
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post(import.meta.env.VITE_SIGNUP_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.authToken) {
        localStorage.setItem('token', res.data.authToken);
        navigate('/');

        setTimeout(() => {
          toast.success('User Signed Up Successfully!')

        }, 500);
      }

    }

    catch (error) {
      toast.error('This Email is already Registered')
    }


    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-[35em] h-auto mx-auto mt-40 bg-white flex flex-col border rounded-xl text-center shadow-xl p-5 mb-5">
      <div className="mt-6">
        <h1 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-3xl font-bold">ELAVIEW</h1>
      </div>

      <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
      <p className="text-gray-500 mt-2">Enter your details to get started</p>

      {/*Form*/}
      <form onSubmit={handleSignup} className="p-6">

        {/*Name*/}
        <div className="mt-5 flex flex-col">
          <label className="text-gray-600 font-semibold" htmlFor="name">Name</label>
          <input id="name" className="border-2 p-3 rounded mt-2 w-full focus:border-purple-500 focus:outline-none transition-colors 
            duration-300 focus:shadow-lg"
            type="text" name="name" placeholder="John" value={formData.name} onChange={handleChange} required disabled={isLoading} />
        </div>

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
            type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} minLength={6} required disabled={isLoading} />
        </div>

        {/*Confirm Password*/}
        <div className="mt-5 flex flex-col">
          <label className="text-gray-600 font-semibold" htmlFor="cpassword">Confirm Password</label>
          <input id="cpassword" className="border-2 p-3 rounded mt-2 focus:border-purple-500 focus:outline-none transition-colors duration-300 focus:shadow-lg"
            type="password" name="cpassword" placeholder="••••••••" value={formData.cpassword} onChange={handleChange} minLength={6} required disabled={isLoading} />
        </div>

        {/*Signup Button*/}
        <button type="submit" className="bg-indigo-400/60 text-gray-800 w-full font-semibold rounded p-3 mt-5" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
