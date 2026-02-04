/** @format */

const BASE_URL = "http://localhost:3000";

export default async function getPlaces() {
  const res = await fetch(`${BASE_URL}/places`);

  if (!res.ok) throw new Error(`응답 실패 ${res.status}`);

  const data = await res.json();
  console.log(data.places);

  return data.places;
}
