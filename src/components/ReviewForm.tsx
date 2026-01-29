import { useState, useEffect } from 'react';
import { Review } from '@/types';

interface ReviewFormProps {
    productId: number;
    initialData?: Review;
    onSubmit: (data: { rating: number; comment: string }) => void;
    onCancel: () => void;
}

export default function ReviewForm({ productId, initialData, onSubmit, onCancel }: ReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (initialData) {
            setRating(initialData.rating);
            setComment(initialData.comment);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, comment });
    };

    return (
        <form onSubmit={handleSubmit} className="soft-card p-6 bg-white dark:bg-gray-800 border-2 border-[var(--primary)] dark:border-yellow-600 mb-6">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4 auto-text">
                {initialData ? 'Editar Reseña' : 'Escribir Reseña'}
            </h3>

            {/* Star Selector */}
            <div className="mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Calificación
                </label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <svg
                                className={`w-8 h-8 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
                <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    Tu Opinión
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    className="w-full theme-input rounded-lg p-3 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all"
                    placeholder="Cuéntanos qué te pareció el producto..."
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 btn-primary"
                >
                    {initialData ? 'Actualizar' : 'Publicar'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest theme-btn-cancel transition-all"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
