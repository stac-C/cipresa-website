'use client';

import { useState } from 'react';
import { User, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { updateMyProfile } from '@/lib/actions/profile';
import { updatePassword, fetchCurrentUser } from '@/lib/auth/actions';
import { useAuthStore } from '@/lib/store/auth-store';

interface ProfileFormState {
  fullName: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  bio: string;
}

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cipresa-500 focus:border-transparent outline-none transition-all';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';

export function SettingsView({ initialProfile }: { initialProfile: ProfileFormState }) {
  const setUser = useAuthStore((s) => s.setUser);
  const [form, setForm] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);

  const [passwords, setPasswords] = useState({ next: '', confirm: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const updateField = (field: keyof ProfileFormState, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateMyProfile({
        fullName: form.fullName,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
        avatar: form.avatar,
      });
      const refreshed = await fetchCurrentUser();
      setUser(refreshed);
      toast.success('Profil mis à jour !');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    setIsChangingPassword(true);
    try {
      await updatePassword(passwords.next);
      setPasswords({ next: '', confirm: '' });
      toast.success('Mot de passe mis à jour !');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <User className="w-5 h-5 text-cipresa-500" /> Informations personnelles
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nom complet</label>
            <input type="text" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
          </div>
          <div>
            <label className={labelClass}>Téléphone</label>
            <input type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass} placeholder="2376XXXXXXXX" />
          </div>
          <div>
            <label className={labelClass}>Localisation</label>
            <input type="text" value={form.location} onChange={(e) => updateField('location', e.target.value)} className={inputClass} placeholder="Yaoundé, Cameroun" />
          </div>
          <div>
            <label className={labelClass}>Photo de profil (URL)</label>
            <input type="text" value={form.avatar} onChange={(e) => updateField('avatar', e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Bio</label>
            <textarea value={form.bio} onChange={(e) => updateField('bio', e.target.value)} rows={3} className={inputClass} placeholder="Parlez-nous de vous..." />
          </div>
        </div>
        <Button type="submit" className="mt-5" loading={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enregistrer'}
        </Button>
      </form>

      <form onSubmit={handleChangePassword} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <Lock className="w-5 h-5 text-cipresa-500" /> Changer le mot de passe
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nouveau mot de passe</label>
            <input
              type="password"
              value={passwords.next}
              onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className={labelClass}>Confirmer le mot de passe</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>
        </div>
        <Button type="submit" className="mt-5" loading={isChangingPassword}>
          {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Mettre à jour le mot de passe'}
        </Button>
      </form>
    </div>
  );
}
