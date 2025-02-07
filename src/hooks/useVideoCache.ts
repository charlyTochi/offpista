import { useState, useEffect, useRef } from 'react';

interface CacheItem {
  url: string;
  loaded: boolean;
  data?: any;
  timestamp: number;
}

interface VideoMetadata {
  url: string;
  coverImage: string;
  id: string;
}

const CACHE_SIZE = 5; // Increased cache size
const PRELOAD_THRESHOLD = 2; // Number of videos to preload in each direction
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useVideoCache = (videos: VideoMetadata[], currentIndex: number) => {
  const [cache, setCache] = useState<Map<string, CacheItem>>(new Map());
  const [loadingStates, setLoadingStates] = useState<Map<string, boolean>>(new Map());
  const abortControllers = useRef<Map<string, AbortController>>(new Map());

  const cleanupCache = () => {
    const now = Date.now();
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      for (const [url, item] of newCache.entries()) {
        if (now - item.timestamp > CACHE_EXPIRY) {
          if (item.data) {
            URL.revokeObjectURL(item.data);
          }
          newCache.delete(url);
        }
      }
      return newCache;
    });
  };

  const preloadVideo = async (url: string, priority: boolean = false) => {
    if (!url || cache.has(url) || loadingStates.get(url)) return;

    // Cancel existing preload for this URL if any
    if (abortControllers.current.has(url)) {
      abortControllers.current.get(url)?.abort();
      abortControllers.current.delete(url);
    }

    const controller = new AbortController();
    abortControllers.current.set(url, controller);

    setLoadingStates(prev => new Map(prev).set(url, true));

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        priority: priority ? 'high' : 'low',
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setCache(prevCache => {
        const newCache = new Map(prevCache);
        newCache.set(url, {
          url,
          loaded: true,
          data: objectUrl,
          timestamp: Date.now(),
        });

        // Remove oldest items if cache exceeds size
        while (newCache.size > CACHE_SIZE) {
          const oldestEntry = Array.from(newCache.entries())
            .reduce((oldest, current) => 
              current[1].timestamp < oldest[1].timestamp ? current : oldest
            );
          
          if (oldestEntry[1].data) {
            URL.revokeObjectURL(oldestEntry[1].data);
          }
          newCache.delete(oldestEntry[0]);
        }

        return newCache;
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error preloading video:', error);
      }
    } finally {
      setLoadingStates(prev => {
        const next = new Map(prev);
        next.delete(url);
        return next;
      });
      abortControllers.current.delete(url);
    }
  };

  useEffect(() => {
    // Clean up expired cache items
    const cleanupInterval = setInterval(cleanupCache, 60000); // Every minute

    return () => {
      clearInterval(cleanupInterval);
      // Cleanup all abort controllers
      abortControllers.current.forEach(controller => controller.abort());
      abortControllers.current.clear();
      // Cleanup object URLs
      cache.forEach(item => {
        if (item.data) {
          URL.revokeObjectURL(item.data);
        }
      });
    };
  }, []);

  useEffect(() => {
    const preloadVideos = async () => {
      // Preload current video with high priority
      if (videos[currentIndex]?.url) {
        await preloadVideo(videos[currentIndex].url, true);
      }

      // Preload adjacent videos
      for (let i = 1; i <= PRELOAD_THRESHOLD; i++) {
        const nextIndex = (currentIndex + i) % videos.length;
        const prevIndex = (currentIndex - i + videos.length) % videos.length;

        if (videos[nextIndex]?.url) {
          preloadVideo(videos[nextIndex].url);
        }
        if (videos[prevIndex]?.url) {
          preloadVideo(videos[prevIndex].url);
        }
      }
    };

    preloadVideos();
  }, [currentIndex, videos]);

  const getVideoSource = (url: string) => {
    const cachedItem = cache.get(url);
    return cachedItem?.loaded ? { uri: cachedItem.data } : { uri: url };
  };

  const isLoading = (url: string) => loadingStates.get(url) || false;

  return { getVideoSource, isLoading };
}; 