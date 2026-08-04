import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Award, Download, ExternalLink } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getUserCertificates } from '@/lib/data/certificates';
import { formatDate } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export default async function CertificatesPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?next=/dashboard/certificates');

  const certificates = await getUserCertificates(user.id);

  if (certificates.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
        <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-4">Terminez une formation pour obtenir votre premier certificat.</p>
        <Link href="/dashboard/my-courses"><Button size="sm">Voir mes cours</Button></Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {certificates.map((cert) => (
        <div key={cert.id} className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-cipresa-50 dark:bg-cipresa-950/50 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-cipresa-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">{cert.courseTitle}</p>
            <p className="text-xs text-gray-500 mt-1">Délivré le {formatDate(cert.issuedAt, 'long')}</p>
            <div className="mt-3 flex items-center gap-2">
              <Link href={`/course/${cert.courseSlug}`} className="text-xs text-cipresa-600 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> Voir le cours
              </Link>
              {cert.certificateUrl && (
                <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cipresa-600 hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Télécharger
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
