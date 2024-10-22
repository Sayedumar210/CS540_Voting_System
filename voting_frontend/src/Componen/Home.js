// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';  // Importing the CSS file

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       <h1 className="home-title">Welcome to the Voting App</h1>
//       <div className="home-buttons">
//         <button className="btn-primary" onClick={() => navigate('/login')}>
//           Login
//         </button>
//         <button className="btn-secondary" onClick={() => navigate('/signup')}>
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;



// second 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Importing the CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title animated-title">Welcome to the Voting App</h1>
      <div className="home-buttons">
        <button className="btn-primary animated-button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn-secondary animated-button" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
