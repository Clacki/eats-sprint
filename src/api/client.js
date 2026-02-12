/** @format */

const BASE_URL = import.meta.env.VITE_API_BASE;

export default async function fetchPlaces() {
  let res;

  try {
    res = await fetch(`${BASE_URL}/places`);
  } catch (networkError) {
    const err = new Error("서버에 연결할 수 없습니다.");
    err.status = 0;
    throw err;
  }

  if (!res.ok) {
    const err = new Error(`HTTP Error: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  return data.places;
}
