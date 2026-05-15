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

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs")
      return
    }

    // 🔍 verify user exists
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      setErrorMessage("Compte introuvable. Créez un compte.")
      return
    }

    // ✅ LOGIN SUCCESS
    localStorage.setItem('session', 'active')
    localStorage.setItem('currentUser', JSON.stringify(user))

    navigate('/')
  }

  return (
    <div className="connexion-page">

      <div className="connexion-card">

        <h2>Connexion</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="connexion-error">
              {errorMessage}
            </p>
          )}

          <button className="btn-primary" type="submit">
            Se connecter
          </button>

        </form>

        {/* 👉 link to register */}
        <p style={{ marginTop: '10px' }}>
          Pas de compte ?{' '}
          <Link to="/register">
            Créer un compte
          </Link>
        </p>

      </div>

    </div>
  )
}