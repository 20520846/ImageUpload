import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Image from './components/Image';
import SideBar from './components/SideBar';

function App(): JSX.Element {

  return (
    <Router>
      <div className="flex">
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<Image />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
