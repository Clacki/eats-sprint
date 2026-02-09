/** @format */

import { useEffect, useMemo, useState } from "react";
import fetchPlaces from "@/api/client";
import useCurrentPosition from "@/hooks/useCurrentPosition";
import { sortPlacesByDistance } from "@/utils/loc";

function formatDistance(distanceKm) {
  if (!Number.isFinite(distanceKm)) return "거리 정보 없음";
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)}m`;
  return `${distanceKm.toFixed(1)}km`;
}

export default function NearbyRestraunt() {
  const { position, loading: posLoading, error: posError } = useCurrentPosition();

  const [places, setPlaces] = useState([]);
  const [placesLoading, setPlacesLoading] = useState(true);
  const [placesError, setPlacesError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setPlacesLoading(true);
        setPlacesError(null);
        const data = await fetchPlaces();
        setPlaces(data);
      } catch (e) {
        setPlacesError(e);
      } finally {
        setPlacesLoading(false);
      }
    })();
  }, []);

  const sortedPlaces = useMemo(() => {
    if (!position) return [];
    return sortPlacesByDistance(places, position.lat, position.lon);
  }, [places, position]);

  const loading = posLoading || placesLoading;

  if (loading) return <div className="p-4">로딩중…</div>;
  if (posError) return <div className="p-4">위치 권한을 허용해야 근처 맛집을 볼 수 있어요.</div>;
  if (placesError) return <div className="p-4">맛집 데이터를 불러오지 못했어요.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 mt-10">
      <h1 className="text-xl font-semibold font-yfavorite">내 근처 맛집</h1>

      <ul className="mt-4 space-y-3">
        {sortedPlaces.map((p) => (
          <li key={p.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-500 whitespace-nowrap">{formatDistance(p.distanceKm)}</div>
            </div>
            <div className="text-sm text-gray-500">{p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
