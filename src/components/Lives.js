import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

const Lives = () => {
  const [lives, setLives] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLives = async () => {
      try {
        const response = await fetch('https://api.cca-fll.com.br/lives', {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('Erro ao carregar lives');
        
        const data = await response.json();
        setLives(data.lives);
        
        // Auto-select the first video if available
        const firstLive = Object.values(data.lives)[0];
        if (firstLive) {
          setSelectedVideo(firstLive);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLives();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Main Video Section */}
        <div className="w-full aspect-video bg-black">
          {selectedVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Video Title */}
        {selectedVideo && (
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedVideo.title}
            </h1>
          </div>
        )}

        {/* Video List */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Todas as Lives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(lives).map(([key, live]) => (
              <div
                key={key}
                className={`
                  rounded-lg overflow-hidden cursor-pointer transition-all duration-200
                  ${selectedVideo === live ? 'ring-2 ring-[#346c79]' : 'hover:shadow-lg'}
                `}
                onClick={() => setSelectedVideo(live)}
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${live.video_id}/maxresdefault.jpg`}
                    alt={live.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play
                      size={48}
                      className={`
                        text-white opacity-80 transition-transform duration-200
                        ${selectedVideo === live ? 'scale-100' : 'scale-90'}
                      `}
                    />
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">
                    {live.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lives;