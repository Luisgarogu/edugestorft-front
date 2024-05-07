import "./App.css";
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home1 from './Pages/Home1';
import Home2 from './Pages/Home2';


function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/*" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </Router>
  );
}


export default App;
