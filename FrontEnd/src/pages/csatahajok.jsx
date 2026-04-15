import { useEffect, useState } from 'react'

function CsatahajokPage({ onSelectHajo }) {
  const [hajos, setHajos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHajos = async () => {
      try {
        const response = await fetch('http://localhost:5014/api/Hajo/All')
        if (!response.ok) {
          throw new Error(`Hiba a szervertől: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setHajos(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt')
      } finally {
        setLoading(false)
      }
    }

    fetchHajos()
  }, [])

  return (
    <main className="page-content container py-4">
      <h1 className="mb-4">Csatahajók</h1>

      {loading && <p>Betöltés...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row g-4">
          {hajos.map((hajo, index) => {
            const name = hajo.Nev ?? hajo.nev ?? `Hajó ${index + 1}`
            return (
              <div key={`${name}-${index}`} className="col-12 col-sm-6 col-md-4">
                <div
                  className="card h-100 shadow-sm card-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectHajo(name)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectHajo(name)
                    }
                  }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="card-title text-center mb-0">{name}</h5>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default CsatahajokPage
