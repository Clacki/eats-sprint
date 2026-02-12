/** @format */

import { useEffect, useMemo, useState } from "react";
import fetchPlaces from "@/api/client";
import useCurrentPosition from "@/hooks/useCurrentPosition";
import { sortPlacesByDistance } from "@/utils/loc";
import { useFavorites } from "@/context/FavoritesProvider";

function formatDistance(distanceKm) {
  if (!Number.isFinite(distanceKm)) return "거리 정보 없음";
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)}m`;
  return `${distanceKm.toFixed(1)}km`;
}

export default function NearbyRestraunt() {
  const { position, loading: posLoading, error: posError } = useCurrentPosition();
  const { addFavorite } = useFavorites();

  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [placesError, setPlacesError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setPlacesLoading(true);
        setPlacesError(null);

        const data = await fetchPlaces();
        setPlaces(Array.isArray(data) ? data : []); // ✅ 핵심: data 자체가 배열
      } catch (e) {
        setPlacesError(e);
      } finally {
        setPlacesLoading(false);
      }
    })();
  }, []);

  const sortedPlaces = useMemo(() => {
    if (!places.length) return [];
    if (!position) return places; // ✅ 위치 없으면 원본
    return sortPlacesByDistance(places, position.lat, position.lon);
  }, [places, position]);

  if (placesLoading) return <div className="p-4">로딩중…</div>;
  if (placesError) return <div className="p-4">맛집 데이터를 불러오지 못했어요.</div>;

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <h1 className="text-xl font-semibold font-yfavorite">내 근처 맛집</h1>

      {posLoading && <div className="mt-2 text-sm text-gray-500">내 위치 확인 중…</div>}
      {posError && (
        <div className="mt-2 text-sm text-red-500">위치 권한을 허용하면 거리순 정렬/거리표시가 가능해요.</div>
      )}

      <ul className="mt-4 space-y-3">
        {sortedPlaces.map((p) => (
          <li key={p.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="font-medium">{p.title}</div>

              <div className="flex items-center gap-2">
                <div className="whitespace-nowrap text-sm text-gray-500">{formatDistance(p.distanceKm)}</div>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await addFavorite(p);
                    } catch (e) {
                      alert(e?.message ?? "찜 저장 중 오류");
                    }
                  }}
                  className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  찜
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">{p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
