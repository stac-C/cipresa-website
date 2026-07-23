import { supabase } from '@/lib/supabase/client';
import type { User } from '@/types';

function mapProfileToUser(id: string, email: string, profile: {
  full_name: string;
  avatar: string | null;
  role: User['role'];
  phone: string | null;
  location: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}): User {
  return {
    id,
    email,
    fullName: profile.full_name,
    avatar: profile.avatar ?? undefined,
    role: profile.role,
    phone: profile.phone ?? undefined,
    location: profile.location ?? undefined,
    bio: profile.bio ?? undefined,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  };
}

export async function fetchCurrentUser(): Promise<User | null> {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar, role, phone, location, bio, created_at, updated_at')
    .eq('id', authUser.id)
    .single();

  if (!profile) return null;

  return mapProfileToUser(authUser.id, authUser.email!, profile);
}

export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpWithPassword(params: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}) {
  const { error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: { full_name: params.fullName, phone: params.phone },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/';
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}
