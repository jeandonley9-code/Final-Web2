import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    // ❌ no real auth system
    localStorage.setItem('session', 'active')

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
            <p className="connexion-error">{errorMessage}</p>
          )}

          <button className="btn-primary" type="submit">
            Se connecter
          </button>

        </form>

      </div>
    </div>
  )
}