import { useEffect, useState } from 'react'

function HajoDetailPage({ hajonev, onBack }) {
  const [hajo, setHajo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHajo = async () => {
      try {
        const response = await fetch(`http://localhost:5014/api/Hajo/ByName/${encodeURIComponent(hajonev)}`)
        if (!response.ok) {
          throw new Error(`Hiba a szervertől: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setHajo(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ismeretlen hiba történt')
      } finally {
        setLoading(false)
      }
    }

    fetchHajo()
  }, [hajonev])

  const name = hajo?.Nev ?? hajo?.nev ?? hajonev

  return (
    <main className="page-content container py-4">
      <div className="card detail-card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-4">Hajó részletek</h1>

          {loading && <p>Betöltés...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && hajo && (
            <div className="mb-4">
              <h2>{name}</h2>
              <p><strong>Osztály:</strong> {hajo.Osztaly ?? hajo.osztaly ?? '-'}</p>
              <p><strong>Felavatva:</strong> {hajo.Felavatva ?? hajo.felavatva ?? '-'}</p>
              <p><strong>Ágyúk száma:</strong> {hajo.AgyukSzama ?? hajo.agyukSzama ?? '-'}</p>
              <p><strong>Kaliber:</strong> {hajo.Kaliber ?? hajo.kaliber ?? '-'}</p>
              <p><strong>Vízkiszorítás:</strong> {hajo.Vizkiszoritas ?? hajo.vizkiszoritas ?? '-'}</p>
            </div>
          )}

          {!loading && !error && !hajo && <p>Nem található a kiválasztott hajó.</p>}

          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Vissza a csatahajókhoz
          </button>
        </div>
      </div>
    </main>
  )
}

export default HajoDetailPage
