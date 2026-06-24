import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        The Hunter's Archive
      </Link>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Writings
        </Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
          Projects
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
