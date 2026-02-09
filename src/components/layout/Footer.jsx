/** @format */

function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e7d9cb] bg-[#F7EBDD]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* 왼쪽: 로고/설명 */}
          <div>
            <div className="text-lg font-extrabold text-[#3b2a1f]">근처맛집</div>
            <p className="mt-2 text-sm text-[#6b5a4e]">내 주변 맛집을 빠르게 찾아보세요.</p>
          </div>

          {/* 오른쪽: 링크 */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6b5a4e]">
            <a href="#" className="hover:text-[#3b2a1f]">
              이용약관
            </a>
            <a href="#" className="hover:text-[#3b2a1f]">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-[#3b2a1f]">
              문의하기
            </a>
          </nav>
        </div>

        <div className="mt-8 text-xs text-[#8a786c]">
          © {new Date().getFullYear()} 근처맛집. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
