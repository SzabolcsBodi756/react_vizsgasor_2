import { useEffect, useState } from 'react'
import './App.css'
import CsatahajokPage from './pages/csatahajok.jsx'
import DenmarkStraitCsataPage from './pages/denmark-strait-csata.jsx'
import HajoDetailPage from './pages/hajo-detail.jsx'

function Navbar({ currentPath, onNavigate }) {
  const isCsatahajok = currentPath.startsWith('/csatahajok')

  return (
    <nav className="navbar">
      <a
        href="/csatahajok"
        className={isCsatahajok ? 'active' : ''}
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/csatahajok')
        }}
      >
        Csatahajók
      </a>
      <a
        href="/denmark-strait-csata"
        className={currentPath === '/denmark-strait-csata' ? 'active' : ''}
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/denmark-strait-csata')
        }}
      >
        A Denmark Strait csata
      </a>
    </nav>
  )
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    if (path === currentPath) return
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const normalizedPath = currentPath.replace(/\/+$/, '') || '/'
  let content

  if (normalizedPath === '/csatahajok') {
    content = <CsatahajokPage onSelectHajo={(name) => navigate(`/csatahajok/hajo/${encodeURIComponent(name)}`)} />
  } else if (normalizedPath === '/denmark-strait-csata') {
    content = <DenmarkStraitCsataPage onNavigate={navigate} />
  } else if (normalizedPath.startsWith('/csatahajok/hajo/')) {
    const hajonev = decodeURIComponent(normalizedPath.substring('/csatahajok/hajo/'.length))
    content = <HajoDetailPage hajonev={hajonev} onBack={() => navigate('/csatahajok')} />
  } else {
    content = <CsatahajokPage onSelectHajo={(name) => navigate(`/csatahajok/hajo/${encodeURIComponent(name)}`)} />
  }

  return (
    <>
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      {content}
    </>
  )
}

export default App
