import { useEffect, useState } from 'react'
import './Profil.css'

const services = [
  { icon: '🛒', label: 'Aide aux courses', color: '#3B5BFC' },
  { icon: '📚', label: 'Soutien scolaire', color: '#22c55e' },
  { icon: '👴', label: 'Visites aux personnes âgées', color: '#ef4444' },
]

export default function Profil() {
  const defaultProfile = {
    fullName: 'Towensia Jolibois',
    location: 'Bénévole à Delmas',
    services: ['Aide aux courses', 'Soutien scolaire', 'Visites aux personnes âgées'],
    demandesAidées: 12,
    note: 4.8,
    membreDepuis: '3 mois',
    avatarUrl: '',
  }

  const [profile, setProfile] = useState(defaultProfile)

  const [editMode, setEditMode] = useState(false)

  const [editProfile, setEditProfile] = useState({
    fullName: defaultProfile.fullName,
    location: defaultProfile.location,
    services: defaultProfile.services.join(', '),
    avatarUrl: defaultProfile.avatarUrl,
  })

  const [demandeursList, setDemandeursList] = useState([])

  const [newDemandeur, setNewDemandeur] = useState({
    nom: '',
    location: '',
    service: '',
    note: '',
  })

  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('profilUser')
    if (stored) {
      setProfile(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('profilUser', JSON.stringify(profile))
  }, [profile])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setEditProfile(prev => ({
        ...prev,
        avatarUrl: reader.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = (e) => {
    e.preventDefault()

    const updated = {
      ...profile,
      fullName: editProfile.fullName,
      location: editProfile.location,
      services: editProfile.services
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      avatarUrl: editProfile.avatarUrl,
    }

    setProfile(updated)
    setEditMode(false)
  }

  const handleAddDemandeur = (e) => {
    e.preventDefault()

    const nouveau = {
      id: Date.now(),
      ...newDemandeur,
    }

    setDemandeursList([...demandeursList, nouveau])

    setNewDemandeur({
      nom: '',
      location: '',
      service: '',
      note: '',
    })

    setShowForm(false)
  }

  return (
    <div className="profil">

      <div className="card profil-card">
        <div className="profil-avatar">
          {profile.avatarUrl
            ? <img src={profile.avatarUrl} alt="Avatar" />
            : profile.fullName.split(' ').map(n => n[0]).join('')
          }
        </div>

        <div className="profil-info">
          <h2>{profile.fullName}</h2>
          <p>📍 {profile.location}</p>
        </div>
      </div>

      <div className="card">
        <h3>Mes services proposés</h3>

        <div className="profil-services">
          {profile.services.map((label, i) => (
            <div key={i}>
              <span style={{ color: services[i]?.color || '#3B5BFC' }}>●</span>{' '}
              {label}
            </div>
          ))}
        </div>

        {/* BOUTONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>

          <button
            className="btn-green"
            onClick={() => {
              setEditProfile({
                fullName: profile.fullName,
                location: profile.location,
                services: profile.services.join(', '),
                avatarUrl: profile.avatarUrl || '',
              })
              setEditMode(true)
            }}
          >
            ✏️ Modifier le Profil
          </button>

          <button
            className="btn-blue"
            onClick={() => setShowForm(true)}
          >
            ➕ Ajouter un profil
          </button>

        </div>
      </div>

      {/* <div className="card">
        <h3>Statistiques</h3>

        <p>📌 {profile.demandesAidées} demandes aidées</p>
        <p>⭐ {profile.note} note moyenne</p>
        <p>📅 {profile.membreDepuis}</p>
      </div> */}

      <div className="card">
        <h3>Profils des demandeurs</h3>

        {showForm && (
          <form onSubmit={handleAddDemandeur} className="add-form">

            <input
              placeholder="Nom"
              value={newDemandeur.nom}
              onChange={(e) =>
                setNewDemandeur({ ...newDemandeur, nom: e.target.value })
              }
              required
            />

            <input
              placeholder="Localisation"
              value={newDemandeur.location}
              onChange={(e) =>
                setNewDemandeur({ ...newDemandeur, location: e.target.value })
              }
              required
            />

            <input
              placeholder="Service"
              value={newDemandeur.service}
              onChange={(e) =>
                setNewDemandeur({ ...newDemandeur, service: e.target.value })
              }
              required
            />

            <input
              placeholder="Note"
              value={newDemandeur.note}
              onChange={(e) =>
                setNewDemandeur({ ...newDemandeur, note: e.target.value })
              }
              required
            />

            <button className="btn-green" type="submit">
              Ajouter
            </button>

          </form>
        )}

        <div className="demandeurs-list">
          {demandeursList.map((d) => (
            <div key={d.id}>
              <strong>{d.nom}</strong> - {d.location} - {d.service} - ⭐ {d.note}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL EDIT */}
      {editMode && (
        <div className="modal-overlay" onClick={() => setEditMode(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <h3>Modifier profil</h3>

            <form onSubmit={handleSave}>

              <input
                value={editProfile.fullName}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, fullName: e.target.value })
                }
              />

              <input
                value={editProfile.location}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, location: e.target.value })
                }
              />

              <input
                value={editProfile.services}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, services: e.target.value })
                }
              />

              <input type="file" onChange={handleAvatarChange} />

              <button className="btn-green" type="submit">
                Enregistrer
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}