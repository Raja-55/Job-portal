import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Login from './components/admin/auth/Login'
import Signup from './components/admin/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'


const Layout = () => (
  <div className='min-h-screen flex flex-col'>
    <Navbar />
    <main className='flex-1'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'description/:id', element: <JobDescription /> },
      { path: 'browse', element: <Browse /> },
      { path: 'profile', element: <Profile /> },
      { path: 'admin/companies', element: <ProtectedRoute><Companies/></ProtectedRoute> },
      { path: 'admin/companies/create', element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> },
      { path: 'admin/companies/:id', element: <ProtectedRoute><CompanySetup/></ProtectedRoute> },
      { path: 'admin/jobs', element: <ProtectedRoute><AdminJobs/></ProtectedRoute> },
      { path: 'admin/jobs/create', element: <ProtectedRoute><PostJob/></ProtectedRoute> },
      { path: 'admin/jobs/:id/applicants', element: <ProtectedRoute><Applicants/></ProtectedRoute> },
    ]
  }
])
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  // Setup axios default configs and auth header
  useEffect(() => {
    axios.defaults.withCredentials = true;
    
    // Restore token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("✓ Auth header restored from localStorage");
    }
    
    // Set Authorization header if user is logged in
    if (user && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("✓ Auth header set with token");
    } else if (!token) {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  // Check user persistence on app load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("→ Verifying user session...");
        // Try to fetch user profile - if token is valid, user is authenticated
        const res = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true
        });
        if (res.data.success) {
          console.log("✓ User verified:", res.data.user._id);
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        // Token invalid or expired, clear user
        console.log("❌ User verification failed:", error.response?.status);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common["Authorization"];
        dispatch(setUser(null));
      }
    };
    
    // Only verify if Redux doesn't already have user info from storage
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        // Token exists, verify it's still valid
        verifyUser();
      }
    }
  }, [dispatch, user]);

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
