import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';

// for showing toast messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import AddJournalPage from './pages/AddJournal';
import ContactUs from './pages/Contact';
import EditJournal from './pages/EditJournalPage';
import EditProfile from './pages/EditProfile';
import ForgotPasswordCode from './pages/ForgetPasswordCode';
import GalleryPage from './pages/Galleryy';
import JournalPage from './pages/JournalPage';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import ResetPassword from './pages/ResetPassword';
import SendEmail from './pages/SendEmail';
import SingleJournalPage from './pages/SingleJournalPage';



function App() {
  const DisplayNavbar = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/login', '/register'];

    if (hideNavbarRoutes.includes(location.pathname.toLowerCase())) {
      return null;
    }
    return <Navbar />;
  };

  const DisplayFooter = () => {
    const location = useLocation();
    const hideFooterRoutes = ['/login', '/register', '/gallery', '/profile'];

    if (hideFooterRoutes.includes(location.pathname.toLowerCase())) {
      return null;
    }
    return <Footer />;
  };
  return (
    <Router>
      <DisplayNavbar />
      <ToastContainer />
      <Routes>
        <Route path='/home' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/*
        <Route path='/editprofile' element={<EditProfile />} /> */}
        {/* <Route path='/seeprofile' element={<SeeProfile />} /> */}
        <Route path='/sendemail' element={<SendEmail />} />
        <Route path='/resetcode' element={<ForgotPasswordCode />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/journal' element={<JournalPage />} />
        <Route path='/add-journal' element={<AddJournalPage />} />
        <Route path='/journal/:_id' element={<SingleJournalPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/editprofile' element={<EditProfile />} />
        <Route path='/editjournal/:id' element={<EditJournal />} />



        {/* <Route element={<UserRoutes />}>
          <Route path='/profile' element={<h1>Profile</h1>} />
        </Route> */}



      </Routes>
      <DisplayFooter />

    </Router>
  );
}

export default App;
