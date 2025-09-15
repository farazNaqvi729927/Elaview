import { Route, Routes } from 'react-router';
import BrowsePage from './pages/BrowsePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import ScrollToTop from './pages/ScrollToTop.js';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import About from './pages/About.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <main className="flex-grow">
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<SignIn />} />
          <Route path='/about' element={<About />} />

          <Route path='/home' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path='/browse' element={<ProtectedRoutes><BrowsePage /></ProtectedRoutes>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App
