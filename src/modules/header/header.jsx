import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Import FontAwesome user icon
import './header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
 
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

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
              <>
                <li>
                  <Link to="/profile">
                  <i class="fa-solid fa-user"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/home" onClick={handleSignOut}>Log out</Link>
                </li>
              </>
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
