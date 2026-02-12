/** @format */
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_BASE;

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/users/places`);
        if (!res.ok) return;
        const data = await res.json();
        setFavorites(Array.isArray(data.places) ? data.places.filter(Boolean) : []);
      } catch {
        // 초기 로딩 실패는 조용히 무시해도 됨
      }
    })();
  }, []);

  const addFavorite = async (place) => {
    if (!place?.id) throw new Error("찜할 데이터가 올바르지 않아요.");

    const res = await fetch(`${API_BASE}/users/places`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place }),
    });

    if (!res.ok) throw new Error("찜 저장 실패");

    // 성공시 200 콘솔
    console.log(res.status);

    setFavorites((prev) => (prev.some((p) => p.id === place.id) ? prev : [...prev, place]));
    return place;
  };

  const removeFavorite = async (id) => {
    const res = await fetch(`${API_BASE}/users/places/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("찜 삭제 실패");

    // 삭제 성공 시 상태 반영
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("가드 오류");
  return ctx;
}
