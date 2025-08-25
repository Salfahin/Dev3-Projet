import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function AuthPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  // Stocke le token CSRF
  const [csrfToken, setCsrfToken] = useState('');

  // 1️⃣ Récupère le CSRF token depuis le backend
  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        await fetch(`${API_URL}/api/auth/csrf`, {
          method: 'GET',
          credentials: 'include', // récupère le cookie httpOnly
        });
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrf-token='))
          ?.split('=')[1];
        setCsrfToken(token || '');
      } catch (err) {
        console.error('Erreur CSRF fetch:', err);
      }
    };
    fetchCsrf();
  }, []);

  // 2️⃣ Vérifie si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/me`, {
          method: 'GET',
          credentials: 'include', // envoie les cookies httpOnly
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) navigate('/profile', { replace: true });
        }
      } catch (err) {
        console.error('AuthPage fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // 3️⃣ Signup / Login
  const handleAuth = async endpoint => {
    setError('');
    try {
      const body = isSignup
        ? { email, password, user_metadata: { first_name: firstName, last_name: lastName, username } }
        : { email, password };

      const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken, // envoie le CSRF token
        },
        credentials: 'include', // important pour récupérer les cookies httpOnly
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/profile', { replace: true });
      } else {
        setError(data.error || `${endpoint} failed`);
      }
    } catch (err) {
      console.error(`${isSignup ? 'Signup' : 'Login'} error:`, err);
      setError(`${isSignup ? 'Signup' : 'Login'} failed`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>{isSignup ? 'Créer un compte' : 'Connexion'}</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />

      {isSignup && (
        <>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={() => handleAuth(isSignup ? 'signup' : 'login')}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
      >
        {isSignup ? 'Créer le compte' : 'Se connecter'}
      </button>

      <button
        onClick={() => setIsSignup(!isSignup)}
        style={{ width: '100%', padding: '0.5rem' }}
      >
        {isSignup ? 'Déjà un compte ? Se connecter' : "Pas encore de compte ? S'inscrire"}
      </button>
    </div>
  );
}
