import { Route, Routes } from 'react-router';
import BrowsePage from './pages/BrowsePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import ScrollToTop from './pages/ScrollToTop.js';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

function App() {

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />

        <Route path='/browse' element={<ProtectedRoutes><BrowsePage /></ProtectedRoutes>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
