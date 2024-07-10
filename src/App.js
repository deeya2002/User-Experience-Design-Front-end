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
import AddJournalPage from './pages/AddJournal';
import ForgotPasswordCode from './pages/ForgetPasswordCode';
import JournalPage from './pages/JournalPage';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import SendEmail from './pages/SendEmail';
import ProfilePage from './pages/ProfilePage';
import SingleJournalPage from './pages/SingleJournalPage';



function App() {
  return (
    <Router>
      <Navbar />
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


        {/* <Route element={<UserRoutes />}>
          <Route path='/profile' element={<h1>Profile</h1>} />
        </Route> */}



      </Routes>

    </Router>
  );
}

export default App;
