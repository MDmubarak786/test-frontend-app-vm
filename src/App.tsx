import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import MyName from './pages/MyName'

function App() {
  return (
    <>
      <nav style={{
        marginBottom: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        gap: '15px',
        justifyContent: 'center'
      }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#646cff',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background 0.3s',
            fontWeight: '500'
          }}
        >
          🏠 Home
        </Link>
        <Link
          to="/about"
          style={{
            textDecoration: 'none',
            color: '#646cff',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background 0.3s',
            fontWeight: '500'
          }}
        >
          ℹ️ About
        </Link>
        <Link
          to="/my-name"
          style={{
            textDecoration: 'none',
            color: '#646cff',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background 0.3s',
            fontWeight: '500'
          }}
        >
          👤 My Name
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-name" element={<MyName />} />
      </Routes>
    </>
  )
}

export default App
