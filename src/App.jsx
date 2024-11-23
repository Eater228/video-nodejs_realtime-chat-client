// #region imports 
import { useEffect, useState } from 'react';
import './App.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulma/css/bulma.css';
// import './styles.scss';
import { RegistrationPage } from './pages/RegistrationPage.jsx'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage.jsx';
// import { Loader } from './components/Loader.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
// import { HomePage } from './pages/HomePage.jsx';
import { useAuth } from './components/AuthContext.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';
import { Loader } from './components/Loader.jsx';
import { RoomPage } from './pages/RoomPage.jsx';
import { CreateRoom } from './pages/CreateRoom.jsx';
// #endregion

export function App() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { isChecked, currentUser, logout, checkAuth } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <nav
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <NavLink to="/room" className="navbar-item">
            Room
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {currentUser ? (
                <button
                  className="button is-light has-text-weight-bold"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="button is-light has-text-weight-bold"
                  >
                    Sign up
                  </Link>

                  <Link
                    to="/login"
                    className="button is-success has-text-weight-bold"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="section content">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route path="/" element={<RequireAuth />}>
              <Route path='/room' element={<RoomPage />} />
              <Route path='/createRoom' element={<CreateRoom />} />
              <Route path="/chat/:id" element={<ChatPage />} />
            </Route>
          </Routes>
        </section>
      </main>
    </>
  )
}
