import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductPage'
import DiseasesPage from './pages/DiseasesPage'
import ComparisonPage from './pages/ComparisonPage'
import AboutPage from './pages/AboutPage'
import AboutPageV2 from './pages/AboutPageV2'
import ContactPage from './pages/ContactPage'
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

const PAGE_TO_PATH = {
  landing: '/',
  product: '/product',
  diseases: '/diseases',
  comparison: '/comparison',
  about: '/about',
  'about-v2': '/about-v2',
  contact: '/contact',
}

function AppInner() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (page) => {
    navigate(PAGE_TO_PATH[page] ?? '/')
  }

  const currentPage = Object.entries(PAGE_TO_PATH).find(
    ([, path]) => path === location.pathname
  )?.[0] ?? 'landing'

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <ScrollToTop />
      <Navbar onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
        <Route path="/product" element={<ProductPage onNavigate={handleNavigate} />} />
        <Route path="/diseases" element={<DiseasesPage onNavigate={handleNavigate} />} />
        <Route path="/comparison" element={<ComparisonPage onNavigate={handleNavigate} />} />
        <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
        <Route path="/about-v2" element={<AboutPageV2 onNavigate={handleNavigate} />} />
        <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
        <Route path="*" element={<LandingPage onNavigate={handleNavigate} />} />
      </Routes>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
