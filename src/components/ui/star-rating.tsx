import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ratingToStars } from '@/lib/utils/format';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  totalReviews?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  showValue = false,
  totalReviews,
  className,
}) => {
  const { full, half, empty } = ratingToStars(rating);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: full }, (_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-cipresa-600 text-cipresa-600" />
        ))}
        {half && (
          <StarHalf size={size} className="fill-cipresa-600 text-cipresa-600" />
        )}
        {Array.from({ length: empty }, (_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-emerald-200 dark:text-emerald-900/50" />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
      {totalReviews !== undefined && (
        <span className="text-sm text-gray-500">
          ({totalReviews})
        </span>
      )}
    </div>
  );
};
