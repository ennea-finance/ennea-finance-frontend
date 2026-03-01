import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";

import AdminLogin from './Pages/Admin/AdminLogin';
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import TeamManagement from './Pages/Admin/TeamManagement';
// import ServicesManagement from './Pages/Admin/ServicesManagement';
// import FeedbackManagement from './Pages/Admin/FeedbackManagement';
// import ArticlesManagement from './Pages/Admin/ArticlesManagement';
// import FAQManagement from './Pages/Admin/FAQManagement';
import NotFound from './Pages/NotFound';
import { ToastContainer } from 'react-toastify';
// import ProtectedRoute from './Components/ProtectedRoute';
// import BlogDetails from './Pages/BlogDetails';
import Disclosure from './Pages/Disclosure';
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <>
     <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/services' element={<Services />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contact' element={<ContactUs />} /> */}
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* ✅ Protected Route */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route path="/admin/team" element={<TeamManagement />} />
        <Route path="/admin/services" element={<ServicesManagement />} />
        <Route path="/admin/feedback" element={<FeedbackManagement />} />
        <Route path="/admin/articles" element={<ArticlesManagement />} />
        <Route path="/admin/faqs" element={<FAQManagement />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} /> */}

      </Routes>
      {/* 👇 Must include this once, globally */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      /></>

  );
}

export default App;
