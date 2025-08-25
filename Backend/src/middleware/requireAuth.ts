import { Request, Response, NextFunction } from 'express';
import { createClient, Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { setAuthCookies } from '../utils/cookies';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    supabaseUserClient?: ReturnType<typeof createClient>;
  }
}

const ACCESS_COOKIE = 'sb-access-token';
const REFRESH_COOKIE = 'sb-refresh-token';
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnon = process.env.SUPABASE_ANON_KEY!;

// Rafraîchit la session si besoin et retourne l'utilisateur + accessToken
export async function refreshIfNeeded(req: Request, res: Response): Promise<{ user: User | null; accessToken: string | null }> {
  const access = req.cookies[ACCESS_COOKIE];
  const refresh = req.cookies[REFRESH_COOKIE];

  // 1️⃣ Tente avec l'access_token actuel
  if (access) {
    const { data, error } = await supabase.auth.getUser(access);
    if (error) console.warn('getUser error:', error.message);
    if (data?.user) return { user: data.user, accessToken: access };
  }

  // 2️⃣ Sinon, tente un refresh
  if (!refresh) return { user: null, accessToken: null };

  const { data, error: refreshErr } = await supabase.auth.refreshSession({ refresh_token: refresh });
  if (refreshErr || !data?.session) return { user: null, accessToken: null };

  // Pose les cookies mis à jour
  setAuthCookies(res, data.session);

  return { user: data.session.user, accessToken: data.session.access_token };
}

// Middleware d'auth pour routes protégées
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, accessToken } = await refreshIfNeeded(req, res);

    if (!user || !accessToken) return res.status(401).json({ error: 'Unauthenticated' });

    req.user = user;
    req.supabaseUserClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    next();
  } catch (err) {
    console.error('requireAuth error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
