import React, { useEffect, useRef, useState } from 'react';
import '../css/header.css';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div id="Header" className="header-fixed-top">
      <div className='top-header'>
        <div className="left-side">
          <a href="/" className="rakutabi-logo">
            <img src="/images/RAKUTABI_logo.png" alt="logo" />
          </a>
          <div className='go-list'>
            <Link to="/room/list">숙소</Link>
            <Link to="/restaurant/list/:id">식당</Link>
          </div>
        </div>

        <div className='right-side'>
          <p className='like-icon'>
            <img src="/images/shop_icon.png" alt="like-icon" />
          </p>
          <div className='go-sign-up'>
            <Link to="/SignIn">로그인</Link>
            <Link to="/SignUp">회원가입</Link>
          </div>

          <div ref={menuRef} className="hamburger-menu">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src="/images/hamburger.logo.PNG" alt="menu" />
            </button>
            {isMenuOpen && (
              <div className="toggle-box">
                <Link to="/SignIn" onClick={() => setIsMenuOpen(false)}>로그인</Link>
                <Link to="/SignUp" onClick={() => setIsMenuOpen(false)}>회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {location.pathname === '/room/list' && (
        <div className='bar-title'>
          <div className='search-bar-alt'>
            <div className='search'>
              <img src="/images/search.png" alt="검색 아이콘" />
              <input type="text" placeholder="여행지 혹은 숙소명 입력" />
            </div>
            <div className='check-in-out'>
              <img src="/images/check_in.png" alt="체크인 아이콘2" width="19px" height="19px"/>
              <span>체크인</span>
              <img src="/images/check_out.png" alt="체크아웃 아이콘2" width="18px" height="18px" />
              <span>체크아웃</span>
            </div>
            <div className='people'>
              <img src="/images/group.png" alt="인원 아이콘" />
              <span>1명, 1객실</span>
            </div>
            <button className='search-button'>검색하기</button>
          </div>
        </div>
      )}
    </div>
  );
}