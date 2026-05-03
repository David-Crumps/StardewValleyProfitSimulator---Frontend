import { useState, useEffect } from 'react';

const Navbar = () => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'light-theme';
  };

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-theme">
          <div className="container-fluid">
            <a className="navbar-brand" href="https://www.youtube.com/">
              Testing
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/add/crop">
                    Add Crop
                  </a>
                </li>
              </ul>
              <button className="theme-btn" onClick={() => toggleTheme()}>
                {theme === 'dark-theme' ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
