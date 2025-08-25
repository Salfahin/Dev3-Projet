import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabaseClient';
import { setAuthCookies, clearAuthCookies } from '../utils/cookies';
import { csrfGuard } from '../middleware/csrf';

const router = Router();

// --- SIGNUP ---
router.post('/signup', csrfGuard, async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      user_metadata: z.object({
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        username: z.string().min(3),
      }).optional(),
    });
    const body = schema.parse(req.body);

    const { data, error } = await supabase.auth.signUp(body);
    if (error) return res.status(400).json({ error: error.message });

    if (data.session) setAuthCookies(res, data.session);

    res.status(201).json({
      user: data.user,
      requiresEmailConfirmation: !data.session,
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- LOGIN ---
router.post('/login', csrfGuard, async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });
    const body = schema.parse(req.body);

    const { data, error } = await supabase.auth.signInWithPassword(body);
    if (error || !data.session) return res.status(401).json({ error: error?.message || 'Authentication failed' });

    setAuthCookies(res, data.session);

    res.json({ user: data.user });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- LOGOUT ---
router.post('/logout', csrfGuard, async (req, res) => {
  try {
    clearAuthCookies(res);
    res.status(204).end();
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ME (GET current user, refresh if needed) ---
router.get('/me', async (req, res) => {
  try {
    const access = req.cookies['sb-access-token'];
    const refresh = req.cookies['sb-refresh-token'];

    // Aucun token
    if (!access && !refresh) return res.status(401).json({ error: 'Not authenticated' });

    // Tente avec access token
    let { data, error } = await supabase.auth.getUser(access);
    if (data?.user) return res.json({ user: data.user });

    // Sinon, tente refresh
    if (!refresh) return res.status(401).json({ error: 'Not authenticated' });
    const { data: refreshed, error: refreshErr } = await supabase.auth.refreshSession({ refresh_token: refresh });
    if (refreshErr || !refreshed?.session) return res.status(401).json({ error: 'Not authenticated' });

    // Pose les nouveaux cookies
    setAuthCookies(res, refreshed.session);
    res.json({ user: refreshed.session.user });
  } catch (err: any) {
    console.error('Me route error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
