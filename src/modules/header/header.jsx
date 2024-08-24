import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FaUserCircle } from 'react-icons/fa'; // Import FontAwesome user icon
import './header.css';
import { useSelector } from 'react-redux';
import { UserData } from '../../utils/userData';

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
  const { isDoctor } = useSelector((store) => store.userStore);
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
  const user = UserData()
  const id = user?.uid
  console.log("idddddddddddddddddddddddddddddddddddddddddddddd", id)
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">TherapyHub</h1>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/docList">Doctors List</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isDoctor ? (
              <li><Link to={`/reservation/${id}}`}>Calendar</Link></li>
            ) : (
              null
            )}
            {isLoggedIn ? (
              <>
                {isDoctor ? (
                  <li><Link to={`/profile/${id}`}><i class="fa-solid fa-user"></i></Link></li>
                ) : (
                  <li><Link to={`/profile`}><i class="fa-solid fa-user"></i></Link></li>
                )}
                <li>
                  <Link to="/" onClick={handleSignOut}>Log out</Link>
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
