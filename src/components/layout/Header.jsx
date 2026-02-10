/** @format */

import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF5EB] shadow-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3  sm:px-6 lg:px-8 font-yfavorite"
      >
        <Link to="/">
          <div className="font-extrabold text-4xl ">근처한입</div>
        </Link>
        <Link to="/NerbyRestaurant">
          <div className="font-bold text-2xl">내 근처 맛집</div>
        </Link>
        <div className="font-bold text-2xl">찜한 맛집</div>
      </nav>
    </header>
  );
}

export default Header;
