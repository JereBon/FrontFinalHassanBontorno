import { useState, useEffect } from 'react';
import { Review } from '@/types';
import { getReviewsByProduct, createReview, updateReview, deleteReview } from '@/services/reviewService';
import { useAuth } from '@/context/AuthContext';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

interface ReviewsSectionProps {
    productId: number;
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | undefined>(undefined);

    useEffect(() => {
        loadReviews();
    }, [productId]);

    const loadReviews = async () => {
        try {
            const data = await getReviewsByProduct(productId);
            setReviews(data);
        } catch (error) {
            console.error('Error loading reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (data: { rating: number; comment: string }) => {
        if (!user) return;
        try {
            const created = await createReview({
                ...data,
                product_id: productId,
                client_id: user.id_key!
            });

            // Optimistic update with full user data for immediate display
            const newReviewWithUser: Review = {
                ...created,
                client: user as any, // Cast to any/Client to ensure compatibility
                created_at: new Date().toISOString()
            };

            setReviews(prev => [newReviewWithUser, ...prev]);
            setShowForm(false);
        } catch (error) {
            console.error('Error creating review:', error);
            alert('Error al publicar la reseña');
        }
    };

    const handleUpdate = async (data: { rating: number; comment: string }) => {
        if (!editingReview) return;
        try {
            await updateReview(editingReview.id_key, {
                ...data,
                product_id: editingReview.product_id,
                client_id: editingReview.client_id
            });
            setEditingReview(undefined);
            setShowForm(false);
            loadReviews();
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Error al actualizar la reseña');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta reseña?')) return;
        try {
            await deleteReview(id);
            loadReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error al eliminar la reseña');
        }
    };

    const openEditForm = (review: Review) => {
        setEditingReview(review);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingReview(undefined);
    };

    // Calculate Average
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    if (loading) return <div className="text-center py-8 text-gray-400">Cargando reseñas...</div>;

    return (
        <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight auto-text mb-2">
                        Reseñas del Producto
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-current' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {averageRating.toFixed(1)} ({reviews.length} reseñas)
                        </span>
                    </div>
                </div>

                {user ? (
                    !showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary"
                        >
                            Dejar una Reseña
                        </button>
                    )
                ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Inicia sesión para dejar una reseña
                    </div>
                )}
            </div>

            {showForm && (
                <div className="max-w-2xl mx-auto">
                    <ReviewForm
                        productId={productId}
                        initialData={editingReview}
                        onSubmit={editingReview ? handleUpdate : handleCreate}
                        onCancel={closeForm}
                    />
                </div>
            )}

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                        <p className="text-gray-500 dark:text-gray-400 mb-2">Este producto aún no tiene reseñas.</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">¡Sé el primero en compartir tu opinión!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id_key}
                                review={review}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
