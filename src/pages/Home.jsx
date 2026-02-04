/** @format */

import getPlaces from "@/api/client";
import { useEffect, useState } from "react";

const IMAGE_BASE = "http://localhost:3000/"; // 서버(Express) 주소

/** @format */
function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces().then(setPlaces);
  }, []);

  return (
    <div>
      <h1>홈</h1>
      {places.map((place) => (
        <div key={place.id}>
          <img src={IMAGE_BASE + place.image.src} alt="" className="w-32 h-32" />
          {place.title}
        </div>
      ))}
    </div>
  );
}

export default Home;
