import { useState, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export function useGiphy() {
    const [gifs, setGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchGifs = useCallback(async (query, signal) => {
        if (!query.trim()) {
            setGifs([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                api_key: API_KEY,
                q: query,
                limit: 25,
                offset: 0,
                rating: 'g',
                lang: 'en',
            });

            const res = await fetch(`${BASE_URL}/search?${params}`, { signal });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            setGifs(data.data);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { gifs, isLoading, error, searchGifs };
}