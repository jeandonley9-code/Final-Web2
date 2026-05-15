import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Accueil.css'

const services = [
  { icon: '🛒', label: 'Aide aux courses' },
  { icon: '📚', label: 'Soutien scolaire' },
  { icon: '👴', label: 'Visites aux personnes âgées' },
  { icon: '🔧', label: 'Petits travaux' },
]

export default function Accueil() {

  const [stats, setStats] = useState({
    benevoles: 0,
    demandes: 0,
    enAttente: 0
  })

  // LOGIN SYSTEM
  const [isLogged, setIsLogged] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {

    // Vérification connexion
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const currentUser = localStorage.getItem('currentUser')

    if (isLoggedIn === 'true' && currentUser) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }

    // Stats
    const stored = localStorage.getItem('demandesList')

    if (stored) {
      const demandes = JSON.parse(stored)

      const enAttente = demandes.filter(
        d => d.statut === 'En attente'
      ).length

      const total = demandes.length

      setStats({
        benevoles: total,
        demandes: total,
        enAttente: enAttente
      })
    }

  }, [])

  // Protection des boutons
  const handleProtectedClick = (e) => {
    if (!isLogged) {
      e.preventDefault()
      setShowAlert(true)
    }
  }

  return (
    <div className="accueil">

      {/* ALERT */}
      {showAlert && (
        <div className="auth-alert">
          <p>
            ⚠️ Vous devez créer un compte et vous connecter.
          </p>

          <button onClick={() => setShowAlert(false)}>
            OK
          </button>
        </div>
      )}

      {/* HERO */}
      <div className="hero">

        <div className="hero-text">

          <h2>
            Connectons la Communauté
            <br />
            pour <span>s'entraider</span>
          </h2>

          <p>
            Trouvez des bénévoles ou proposez votre aide près de chez vous.
          </p>

          <div className="hero-btns">

            <Link
              to="/demandes"
              className="btn-primary"
              onClick={handleProtectedClick}
            >
              Faire une demande
            </Link>

            <Link
              to="/profil"
              className="btn-outline"
              onClick={handleProtectedClick}
            >
              Proposer de l'aide
            </Link>

          </div>

        </div>

        <div className="hero-image">
          🤝
        </div>

      </div>

      {/* SERVICES */}
      <h3 className="section-title">
        Services disponibles
      </h3>

      <div className="services-grid">

        {services.map((s, i) => (
          <div key={i} className="service-card">

            <span className="service-icon">
              {s.icon}
            </span>

            <span className="service-label">
              {s.label}
            </span>

          </div>
        ))}

      </div>

      {/* STATS */}
      <div className="stats-row">

        <div className="stat-card">
          <span className="stat-num">
            {stats.benevoles}
          </span>

          <span className="stat-label">
            Bénévoles actifs
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-num">
            {stats.demandes}
          </span>

          <span className="stat-label">
            Demandes ce mois
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-num">
            {stats.enAttente}
          </span>

          <span className="stat-label">
            En attente
          </span>
        </div>

      </div>

    </div>
  )
}