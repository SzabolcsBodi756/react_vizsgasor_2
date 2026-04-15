import { useEffect, useState } from 'react'

function DenmarkStraitCsataPage({ onNavigate }) {
  const [ships, setShips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const battleName = 'Denmark Strait'

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const response = await fetch(`http://localhost:5014/api/Csata/Resztvevok/${encodeURIComponent(battleName)}`)
        if (!response.ok) {
          throw new Error(`Hiba a szervertől: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setShips(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt')
      } finally {
        setLoading(false)
      }
    }

    fetchShips()
  }, [])

  const handleDelete = async (hajonev) => {
    const confirmed = window.confirm('Biztosan szeretnéd törölni?')
    if (!confirmed) return

    try {
      const response = await fetch(
        `http://localhost:5014/api/Kimenet/KimenetTorles/${encodeURIComponent(battleName)}/${encodeURIComponent(hajonev)}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        const text = await response.text()
        console.error('Törlés hiba:', text)
        setError(text || `Hiba a szerverről: ${response.status}`)
        return
      }

      alert('Sikeres törlés!')
      onNavigate('/csatahajok')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ismeretlen hiba történt'
      console.error('Törlés hiba:', message)
      setError(message)
    }
  }

  return (
    <main className="page-content container py-4">
      <h1 className="mb-4">A Denmark Strait csata</h1>

      {loading && <p>Betöltés...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row g-4">
          {ships.map((ship, index) => (
            <div key={`${ship}-${index}`} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="card-title mb-0">{ship}</h5>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(ship)}
                    title="Törlés"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default DenmarkStraitCsataPage

