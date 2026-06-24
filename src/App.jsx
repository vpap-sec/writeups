import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Writeup from './pages/Writeup'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <BrowserRouter basename = "/writeups">
      <Navbar />
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/projects" element={<Projects />} />
        <Route path = "/writeup/:slug" element={<Writeup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
