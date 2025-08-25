import React, { use, useEffect, useRef, useState } from 'react';
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
    <header id="Header" className="header-fixed-top">
      <div className="left-side">
        <a href="/" className="rakutabi-logo">
          <img src="public\images\RAKUTABI.logo.PNG" alt="logo" />
        </a>
        <div className='go-list'>
          <Link to="/room/detail/:id">숙소</Link>
          <Link to="/restaurant/list/:id">식당</Link>
        </div>
      </div>

      <div className='right-side'>
        <p className='like-icon'>
          <img src="public\images\shop.icon.png" alt="like-icon" />
        </p>
      <div className='go-sign-up'>
          <Link to="/SignIn">로그인</Link>
          <Link to="/SignUp">회원가입</Link>
      </div>
        <div ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src="public\images\hamburger.logo.png" alt="" />
          </button>
            {isMenuOpen && (
              <ul>
               <p>내 예약</p>
               <p>로그인</p>
               <button>로그인</button>
               <button>회원가입</button>
              </ul>
            )}
        </div>
        
      </div>
    </header>
  );
}