import Home from'./pages/home.js'
import User from'./pages/user.js'
import Profile from './pages/profile.js';
import { BrowserRouter as Router, Routes, Route, NavLink, useParams } from 'react-router-dom';

// function BlogPost() {
//   let { id } = useParams();
//   return (
//       <div style={{ fontSize: "50px" }}>
//           Now showing post {id}
//       </div>
//   );
// }

function App() {
  const navigationActive = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      textDecoration: "none",
    };
  };

  return (
    <Router>
      {/* Creating the Navigation Link to go from one route to another using the NavLink  */}
      {/* <nav>
        <NavLink style={navigationActive} to="users">
          User
        </NavLink>
      </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          // This is the part where we are using dynamic Routing
          <Route path="/users" element={<User />} />
          // Dynamic Routing applied for getting different users detail
          // By adding id when we call this path
          <Route path="/users/:id" element={<Profile />} />

        </Routes>
    </Router>
  );
}

export default App;
