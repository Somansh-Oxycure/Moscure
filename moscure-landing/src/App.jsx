import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ProductPage from './pages/ProductPage'
import DiseasesPage from './pages/DiseasesPage'
import ComparisonPage from './pages/ComparisonPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './index.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    if (currentPage === 'product') return <ProductPage onNavigate={handleNavigate} />
    if (currentPage === 'diseases') return <DiseasesPage onNavigate={handleNavigate} />
    if (currentPage === 'comparison') return <ComparisonPage onNavigate={handleNavigate} />
    if (currentPage === 'about') return <AboutPage onNavigate={handleNavigate} />
    if (currentPage === 'contact') return <ContactPage onNavigate={handleNavigate} />
    return <LandingPage onNavigate={handleNavigate} />
  }

  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  )
}
