import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserData } from '../../utils/userData';
import './header.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


function Header() {
  const user = UserData();
  console.log("user", user);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('user'); // Optionally clear user data from localStorage
        localStorage.removeItem('token'); // Optionally clear token from localStorage
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">TherapyHub</h1>
        <nav className="nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/docList">Doctors List</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isLoggedIn ? (
              <li><Link to="/home" onClick={handleSignOut}>Log out</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
