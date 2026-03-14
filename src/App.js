import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";

import NotFound from './Pages/NotFound';
import { ToastContainer } from 'react-toastify';
import Disclosure from "./Pages/Disclosure";
import ScrollToTop from './Components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path="/disclosure" element={<Disclosure />} />


      </Routes>

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
