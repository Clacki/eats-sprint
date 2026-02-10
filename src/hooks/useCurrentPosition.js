/** @format */
import { useEffect, useState } from "react";

export default function useCurrentPosition() {
  const [position, setPosition] = useState(null); // { lat, lon }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("이 브라우저는 위치 기능을 지원하지 않습니다."));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }, // 가능한 한 정확한 위치(GPS 등)로 가져오기
    );
  }, []);

  return { position, loading, error };
}
