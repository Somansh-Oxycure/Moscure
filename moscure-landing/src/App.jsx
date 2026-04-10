import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductPage'
import DiseasesPage from './pages/DiseasesPage'
import ComparisonPage from './pages/ComparisonPage'
import AboutPageV2 from './pages/AboutPageV2'
import ContactPage from './pages/ContactPage'
import IPIIndoorProductPage from './pages/products/IPIIndoorProductPage'
import IPOOutdoorProductPage from './pages/products/IPOOutdoorProductPage'
import UserManualPage from './pages/products/UserManualPage'
import InstallationGuidePage from './pages/products/InstallationGuidePage'
import WarrantyPage from './pages/products/WarrantyPage'
import SafetyGuidelinesPage from './pages/products/SafetyGuidelinesPage'
import IPI1UserManualPage from './pages/products/IPI1UserManualPage'
import IPI1InstallationGuidePage from './pages/products/IPI1InstallationGuidePage'
import IPI1WarrantyPage from './pages/products/IPI1WarrantyPage'
import IPI1SafetyGuidelinesPage from './pages/products/IPI1SafetyGuidelinesPage'
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
  contact: '/contact',
  ipiIndoor: '/products/moscure-ipi-indoor-mosquito-trap',
  ipoOutdoor: '/products/moscure-ipo-outdoor-mosquito-trap',
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
        <Route path="/about" element={<AboutPageV2 onNavigate={handleNavigate} />} />
        <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
        <Route path="/products/moscure-ipi-indoor-mosquito-trap" element={<IPIIndoorProductPage onNavigate={handleNavigate} />} />
        <Route path="/products/moscure-ipo-outdoor-mosquito-trap" element={<IPOOutdoorProductPage onNavigate={handleNavigate} />} />
        <Route path="/user-manual" element={<UserManualPage />} />
        <Route path="/installation-guide" element={<InstallationGuidePage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/safety" element={<SafetyGuidelinesPage />} />
        <Route path="/ipi1/user-manual" element={<IPI1UserManualPage />} />
        <Route path="/ipi1/installation-guide" element={<IPI1InstallationGuidePage />} />
        <Route path="/ipi1/warranty" element={<IPI1WarrantyPage />} />
        <Route path="/ipi1/safety" element={<IPI1SafetyGuidelinesPage />} />
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
