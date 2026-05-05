import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Connexion.css'

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(u => u.email === email)

    if (!user) {
      setErrorMessage("Compte introuvable. Créez un compte d'abord.")
      return
    }

    if (user.password !== password) {
      setErrorMessage("Mot de passe incorrect.")
      return
    }

    // Connexion réussie
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', JSON.stringify(user))

    navigate('/')
  }

  return (
    <div className="connexion-page">
      <div className="connexion-card">
        <div className="connexion-logo"></div>
        <h2>Connexion</h2>
        <p className="connexion-sub">Bienvenue sur la plateforme communautaire</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <div className="connexion-error">{errorMessage}</div>}

          <button type="submit" className="btn-primary" style={{width:'100%', padding:'12px'}}>
            Se connecter
          </button>
        </form>

        <p className="connexion-footer">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}