/** @format */

export function getCurrentPosition(options = {}) {
  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  if (!("geolocation" in navigator)) {
    return Promise.reject(new Error("이 브라우저는 위치 기능을 지원하지 않습니다."));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        resolve({
          lat: latitude,
          lon: longitude,
          accuracy,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        reject(err);
      },
      mergedOptions,
    );
  });
}
