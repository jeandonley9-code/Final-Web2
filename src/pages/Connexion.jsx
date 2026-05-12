import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Connexion.css'

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      email,
      password
    })

    navigate('/')
  }

  return (
    <div className="connexion-page">
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={e => setPassword(e.target.value)}
        />

        <button>Se connecter</button>
      </form>

      <Link to="/register">Créer un compte</Link>
    </div>
  )
}