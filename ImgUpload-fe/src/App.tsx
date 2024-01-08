
import Image from './components/Image';
import SideBar from './components/SideBar';

function App(): JSX.Element {

  return (
    <div className='flex'>
      <SideBar />
      <Image />
    </div>
  );
}

export default App
