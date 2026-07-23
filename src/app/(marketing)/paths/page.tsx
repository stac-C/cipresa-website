import type { Metadata } from 'next';
import Link from 'next/link';
import { Milestone, BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardImage, CardContent } from '@/components/ui/card';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/motion-components';
import { getPublishedLearningPaths } from '@/lib/data/learning-paths';

const levelLabels: Record<string, string> = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé', all: 'Tous niveaux' };

export const metadata: Metadata = {
  title: 'Parcours d\'apprentissage',
  description: 'Suivez un parcours guidé de plusieurs formations, étape par étape et à votre rythme.',
};

export const dynamic = 'force-static';
export const revalidate = 300;

export default async function LearningPathsPage() {
  const paths = await getPublishedLearningPaths();

  return (
    <PageTransition>
      <div className="pt-20">
        <div className="bg-gradient-to-b from-cipresa-950 to-gray-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="success" className="mb-4">Parcours d&apos;apprentissage</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Suivez un parcours guidé</h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Des séquences de cours pensées pour vous mener, étape par étape et à votre rythme, d&apos;un objectif à sa maîtrise.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {paths.length === 0 ? (
            <div className="text-center py-20">
              <Milestone className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Aucun parcours disponible pour le moment</h3>
              <p className="text-gray-500">De nouveaux parcours seront bientôt proposés.</p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paths.map((path) => (
                <StaggerItem key={path.id}>
                  <Link href={`/paths/${path.slug}`} className="group block h-full">
                    <Card className="h-full flex flex-col">
                      <CardImage src={path.thumbnail} alt={path.title} aspect="video" />
                      <CardContent className="flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="info" size="sm">{levelLabels[path.level]}</Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {path.courses.length} cours</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cipresa-600 transition-colors">{path.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{path.description}</p>
                        <span className="mt-4 text-sm text-cipresa-600 font-medium flex items-center gap-1">
                          Découvrir le parcours <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
