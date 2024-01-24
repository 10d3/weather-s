import './navbar.css';
import logo from '../../src/weather-app.png';
export default function Navbar({darkMode, setDarkMode}){

  function toggleTheme(){
    setDarkMode((darkMode) => darkMode === "light" ? "dark" : "light")
  }
  return(
    <div className="navbar">
      <div className="navbar-left">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="navbar-right">
        <button id='toggler' onClick={toggleTheme}>
      {darkMode === 'light' ? '🌜' : '🌞'}
    </button>
      </div>
    </div>
  )
}