import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Image from './components/Image';
import SideBar from './components/SideBar';
import { useContext } from 'react';
import { AuthContext } from "./context/authContext";

function App(): JSX.Element {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <SideBar />
              <Image />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
