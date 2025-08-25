import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (data.user) {
          setUser(data.user);
        } else {
          // Si pas connecté, redirige vers AuthPage
          navigate('/');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/');
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors du logout');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors du logout');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Utilisateur non trouvé.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Profil utilisateur</h1>

      <p><strong>Email:</strong> {user.email}</p>
      {user.user_metadata && (
        <>
          <p><strong>Prénom:</strong> {user.user_metadata.first_name}</p>
          <p><strong>Nom:</strong> {user.user_metadata.last_name}</p>
          <p><strong>Username:</strong> {user.user_metadata.username}</p>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleLogout}
        style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
      >
        Logout
      </button>
    </div>
  );
}
