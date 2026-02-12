/** @format */
import { useState } from "react";
import { useFavorites } from "@/context/FavoritesProvider";

const BASE_URL = import.meta.env.VITE_API_BASE;

const IMAGE_BASE = `${BASE_URL}/`;

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const openModal = (place) => {
    setTarget(place);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTarget(null);
  };

  const confirmDelete = async () => {
    if (!target?.id) return;
    try {
      await removeFavorite(target.id);
      closeModal();
    } catch (e) {
      alert(e?.message ?? "삭제 중 오류");
    }
  };

  if (!favorites.length) {
    return <div className="p-4">아직 찜한 맛집이 없음</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <h1 className="mb-4 text-xl font-semibold">찜한 맛집</h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {favorites.map((p, idx) => (
          <li key={p.id ?? p.placeId ?? `${p.title}-${idx}`}>
            <button
              type="button"
              onClick={() => openModal(p)}
              className="group w-full overflow-hidden rounded-xl border bg-white text-left shadow-sm transition
                         hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6F361B]/20"
            >
              <img
                src={p.image?.src ? IMAGE_BASE + p.image.src : p.image}
                alt={p.title}
                className="h-28 w-full object-cover transition group-hover:scale-[1.02]"
              />

              <div className="p-3">
                <div className="truncate font-semibold">{p.title}</div>
                {p.address && <div className="mt-1 truncate text-sm opacity-70">{p.address}</div>}
                <div className="mt-2 text-xs text-gray-500 opacity-0 transition group-hover:opacity-100">
                  찜 목록에서 삭제하기
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* 삭제, 모달 요구사항 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

          <div className="relative w-[92%] max-w-sm rounded-xl bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold">찜 삭제</h2>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">{target?.title}</span> 을(를) 찜 목록에서 삭제할까요?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
