import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Image from './components/Image';
import SideBar from './components/SideBar';

function App(): JSX.Element {

  return (
    <Router>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Image />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
