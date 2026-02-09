/** @format */

import fetchPlaces from "@/api/client";
import { useEffect, useState } from "react";
import PlacesSkeleton from "./PlacesSkeleton";
import ErrorMessage from "./ErrorMessage";
import map from "@/assets/mainMapImage.png";

const IMAGE_BASE = "http://localhost:3000/";

function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorStatus(null);

      try {
        const data = await fetchPlaces();
        setPlaces(data);
      } catch (error) {
        setErrorStatus(error?.status ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <PlacesSkeleton count={8} />;
  if (errorStatus !== null) return <ErrorMessage status={errorStatus} />;
  return (
    <main>
      {/* HERO: 풀폭 */}
      <section className="relative h-[600px]  bg-[#F7EBDD]">
        {/* 배경 이미지 */}
        <img src={map} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />

        {/* 좌/우 페이드 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7EBDD] via-[#F7EBDD]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#F7EBDD] via-[#F7EBDD]/30 to-transparent" />

        {/* 컨텐츠 컨테이너 */}
        <div className="relative mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                당신 근처의 특별한 맛집을 <br className="hidden sm:block" />
                찾아보세요
              </h1>
              <p className="mt-3 text-sm text-gray-700">지금 가까운 맛집을 검색해보세요.</p>

              {/* 검색 */}
              <div className="mt-6 flex max-w-md overflow-hidden rounded-xl border bg-white shadow-sm">
                <input className="flex-1 px-4 py-3 outline-none" placeholder="지역/가게명을 입력하세요" />
                <button className="px-5 font-semibold text-white bg-orange-500 hover:bg-orange-600">
                  검색
                </button>
              </div>

              {/* 왼쪽 미니 카드 리스트 (places 일부만) */}
              <div className="mt-6 max-w-md space-y-3">
                {places.slice(0, 3).map((place) => (
                  <div
                    key={place.id}
                    className="flex items-center gap-3 rounded-xl border bg-white/90 p-3 shadow-sm backdrop-blur"
                  >
                    <img
                      src={IMAGE_BASE + place.image.src}
                      alt={place.title}
                      className="h-14 w-20 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{place.title}</div>
                      <div className="mt-1 text-xs text-gray-600">
                        {/* 일단 더미, 나중에 place.rating / distance 붙이면 됨 */}
                        평점 4.7 · 500m
                      </div>
                    </div>
                    <span className="ml-auto text-gray-400">›</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽은 배경 이미지만 보이게 비움 */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
      {/* 아래 카드 섹션*/}
      <section className="mt-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="ml-auto w-full ">
            <h2 className="text-3xl font-extrabold text-[#3b2a1f] font-yfavorite">오늘의 추천 맛집</h2>
            <div className="mt-4 border-t border-[#e7d9cb]" />

            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {places.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-[#eadbcc] bg-[#fffaf4] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative">
                    <img
                      src={IMAGE_BASE + p.image.src}
                      alt={p.title}
                      className="h-28 w-full object-cover"
                      loading="lazy"
                    />
                    {/* 이미지 아래에 살짝 그라데이션(텍스트 대비/고급스러움) */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/15 to-transparent" />
                  </div>

                  <div className="p-3">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0">
                        <div className="truncate font-bold text-[#3b2a1f]">{p.title}</div>
                        <div className="mt-1 line-clamp-2 text-xs text-[#6b5a4e]">{p.description}</div>
                      </div>

                      {/* 오른쪽 화살표 */}
                      <span className="ml-auto text-lg text-[#c9b7a6]">›</span>
                    </div>

                    {/* 카테고리 pill (데이터 없으면 임시) */}
                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-[#ffe5cf] px-2 py-1 text-[11px] font-semibold text-[#d46a2f]">
                        {p.category ?? "한식"}
                      </span>
                      <span className="rounded-full bg-[#ffe5cf] px-2 py-1 text-[11px] font-semibold text-[#d46a2f]">
                        {p.region ?? "천안"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
