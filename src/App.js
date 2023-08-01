import {Route, BrowserRouter as Router, Routes,} from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="App">
      <div className='app_body'>
        {!user?(
          <Login/>
        ):(
        <Router>
        <Sidebar/>
          <Routes>
            <Route path="/rooms/:roomId" element={<><Chat/></>}/>
              {/* sidebar */}
              {/* <Sidebar/> */}
              {/* chats view */}
              {/* <Chat/> */}
            <Route path="/" element={<><Chat/></>}/>
          </Routes>
        </Router>
        )}
      </div>
    </div>
  );
}

export default App;
