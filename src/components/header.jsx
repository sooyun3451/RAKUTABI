import React, { useEffect, useRef, useState } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
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
        <div className="left-side">
          <a href="/" className="rakutabi-logo">
            <img src="public/images/RAKUTABI_logo.png" alt="logo" />
          </a>
          <div className='go-list'>
            <Link to="/room/detail/:id">숙소</Link>
            <Link to="/restaurant/list/:id">식당</Link>
          </div>
        </div>

        <div className='right-side'>
          <p className='like-icon'>
            <img src="public\images\shop_icon.png" alt="like-icon" />
          </p>
          <div className='go-sign-up'>
            <Link to="/SignIn">로그인</Link>
            <Link to="/SignUp">회원가입</Link>
          </div>
          
          <div ref={menuRef} className="hamburger-menu">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src="public/images/hamburger.logo.png" alt="menu" />
            </button>
            {isMenuOpen && (
              <div className="toggle-box">
                <p>내 예약</p>
                <Link to="/SignIn" onClick={() => setIsMenuOpen(false)}>로그인</Link>
                <Link to="/SignUp" onClick={() => setIsMenuOpen(false)}>회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}