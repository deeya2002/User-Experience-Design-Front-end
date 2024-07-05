import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';

// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import JournalForm from './components/JournalForm';
// import EditProfile from './pages/EditProfile';
// import ForgotPasswordCode from './pages/ForgetPasswordCode';
// import Galleryy from './pages/Galleryy';
// import JournalPage from './pages/JournalPage';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
// import ProfilePage from './pages/ProfilePage';
// import ResetPassword from './pages/ResetPassword';
// import SeeProfile from './pages/SeeProfile';
// import SendEmail from './pages/SendEmail';


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notification' element={<Notifications />} />
        {/* <Route path='/profile' element={<ProfilePage />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/seeprofile' element={<SeeProfile />} />
        <Route path='/sendemail' element={<SendEmail />} />
        <Route path='/resetcode' element={<ForgotPasswordCode />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/journal' element={<JournalPage />} />
        <Route path="/add-journal" element={<JournalForm />} />
        <Route path="/gallery" element={<Galleryy/>} /> */}
      </Routes>

    </Router>
  );
}

export default App;
