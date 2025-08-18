import React, { useState, useEffect } from 'react';
import { backendService } from '../services/backendService';
import { Photo } from '../types';
import { Heart, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PhotoCard: React.FC<{ photo: Photo, onLike: (photoId: string) => void, currentUserId: string | null }> = ({ photo, onLike, currentUserId }) => {
    const hasLiked = currentUserId ? photo.likes.includes(currentUserId) : false;

    return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 flex items-center">
                <img src={photo.userAvatarUrl} alt={photo.userName} className="h-10 w-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-slate-800">{photo.userName}</p>
                    <p className="text-xs text-slate-500">{new Date(photo.timestamp).toLocaleString('pt-BR')}</p>
                </div>
            </div>
            <img src={photo.imageUrl} alt={photo.caption} className="w-full h-auto" />
            <div className="p-4">
                <p className="text-slate-700 mb-4">{photo.caption}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => onLike(photo.id)} disabled={hasLiked} className={`flex items-center space-x-1 ${hasLiked ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}>
                            <Heart className={`h-6 w-6 ${hasLiked ? 'fill-current' : ''}`} />
                            <span className="font-semibold">{photo.likes.length}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-slate-500 hover:text-blue-500">
                            <MessageSquare className="h-6 w-6" />
                            <span className="font-semibold">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PhotoGalleryPage: React.FC = () => {
    const { user } = useAuth();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = () => {
        setLoading(true);
        backendService.getPhotos().then(data => {
            setPhotos(data);
            setLoading(false);
        });
    };

    const handleLike = async (photoId: string) => {
        if (!user) return;
        await backendService.likePhoto(photoId, user.id);
        loadPhotos(); // Refresh to show updated like count and state
    };
    
    const handlePostPhoto = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;
        const formData = new FormData(e.currentTarget);
        const caption = formData.get('caption') as string;
        const imageUrl = formData.get('imageUrl') as string;

        if (caption && imageUrl) {
            await backendService.createPhoto({
                userId: user.id,
                imageUrl,
                caption,
            });
            loadPhotos();
            e.currentTarget.reset();
        }
    };

    if (loading) return <p className="text-center mt-8">Carregando galeria de fotos...</p>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Galeria da Comunidade</h1>
                <p className="text-slate-600 mt-1">Veja e compartilhe os melhores momentos da sua viagem!</p>
            </div>

            {/* Post new photo */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <form onSubmit={handlePostPhoto} className="space-y-3">
                    <input name="imageUrl" type="text" placeholder="URL da sua foto" className="w-full p-2 border rounded-md" required />
                    <textarea name="caption" placeholder="Escreva uma legenda..." className="w-full p-2 border rounded-md" required />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        Publicar Foto
                    </button>
                </form>
            </div>

            {/* Photo Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {photos.map(photo => (
                    <PhotoCard key={photo.id} photo={photo} onLike={handleLike} currentUserId={user?.id || null} />
                ))}
            </div>
        </div>
    );
};

export default PhotoGalleryPage;
