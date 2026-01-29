import { Review, User } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface ReviewCardProps {
    review: Review;
    onEdit: (review: Review) => void;
    onDelete: (id: number) => void;
}

export default function ReviewCard({ review, onEdit, onDelete }: ReviewCardProps) {
    const { user } = useAuth();

    // Check if the current user owns this review
    const isOwner = user && review.client_id === user.id_key;

    // Helper to render stars
    const renderStars = (rating: number) => {
        return (
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="soft-card p-6 bg-white dark:bg-gray-800 mb-4 transition-all hover:shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold uppercase transition-colors">
                        {review.client?.name?.[0] || 'U'}
                    </div>
                    <div>
                        <p className="font-bold text-sm uppercase tracking-wide auto-text transition-colors">
                            {review.client?.name || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {review.created_at ? new Date(review.created_at).toLocaleDateString() : new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
                {renderStars(review.rating)}
            </div>

            <p className="auto-text text-sm leading-relaxed mb-4 transition-colors">
                {review.comment}
            </p>

            {isOwner && (
                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => onEdit(review)}
                        className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(review.id_key)}
                        className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}
