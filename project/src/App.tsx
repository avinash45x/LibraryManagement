// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import StudentSignup from './pages/StudentSignup';
// import AdminSignup from './pages/AdminSignup';
// import StudentLogin from './pages/StudentLogin';
// import AdminLogin from './pages/AdminLogin';
// import StudentDashboard from './pages/StudentDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import BookCatalog from './pages/BookCatalog';
// import MyAccount from './pages/MyAccount';
// import HelpSupport from './pages/HelpSupport';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
//         <Route path="/student/signup" element={<StudentSignup />} />
//         <Route path="/admin/signup" element={<AdminSignup />} />
//         <Route path="/student/login" element={<StudentLogin />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/student/dashboard" element={<StudentDashboard />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/book-catalog" element={<BookCatalog />} />
//         <Route path="/my-account" element={<MyAccount />} />
//         <Route path="/help-support" element={<HelpSupport />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentSignup from './pages/StudentSignup';
import AdminSignup from './pages/AdminSignup';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookCatalog from './pages/BookCatalog';
import MyAccount from './pages/MyAccount';
import HelpSupport from './pages/HelpSupport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage added here */}
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/book-catalog" element={<BookCatalog />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/help-support" element={<HelpSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
