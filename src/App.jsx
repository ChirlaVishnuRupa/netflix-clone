// import React, { useEffect } from 'react'
// import Home from './pages/Home/Home';
// import { Navigate, Route,Routes } from 'react-router-dom';
// import Login from'./pages/Login/Login';
// import Player from './pages/Player/Player';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// const App = () => {
//    useEffect(()=>{
//         onAuthStateChanged(auth,async(user)=>{
//           if(user){
//             console.log("Logged In");
//             Navigate('/');
//           }
//           else{
//             console.log("Logged out");
//             Navigate('/Login');
//           }
//         })
//    },[Navigate])
//   return (
//     <div>
//       <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/Login" element={<Login/>}/>
//       <Route path='/Player/:id' element={<Player/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App
import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading" >Loading...</div>;
  }

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/player/:id" element={user ? <Player /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
