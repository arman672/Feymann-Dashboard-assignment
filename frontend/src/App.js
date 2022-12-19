import Createuser from "./Createuser";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Content from "./Content";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/createuser" element={<Createuser />} />
          <Route path="/Content" element={<Content />} />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
