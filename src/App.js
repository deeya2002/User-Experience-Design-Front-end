import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Homepage from './pages/Homepage';

// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './pages/EditProfile';
import ForgotPasswordCode from './pages/ForgetPasswordCode';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import ResetPassword from './pages/ResetPassword';
import SeeProfile from './pages/SeeProfile';
import SendEmail from './pages/SendEmail';


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/seeprofile' element={<SeeProfile />} />
        <Route path='/sendemail' element={<SendEmail />} />
        <Route path='/resetcode' element={<ForgotPasswordCode />} />
        <Route path='/resetpassword' element={<ResetPassword />} />


      </Routes>

    </Router>
  );
}

export default App;
