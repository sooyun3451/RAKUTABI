import React, { useEffect, useRef, useState } from 'react';
import '../css/header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const peopleRef = useRef(null);

  // 두 번째 캘린더 상태 및 함수
  const [currentDate2, setCurrentDate2] = useState(new Date());
  const [showCalendar2, setShowCalendar2] = useState(false);
  const [checkInDate2, setCheckInDate2] = useState(null);
  const [checkOutDate2, setCheckOutDate2] = useState(null);
  const calendarRef2 = useRef(null);
  const checkInOutRef2 = useRef(null);

  const year2 = currentDate2.getUTCFullYear();
  const month2 = currentDate2.getUTCMonth();

  const today2 = new Date();
  today2.setHours(0, 0, 0, 0);

  const getCalendarData2 = (year, month) => {
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const startDay = new Date(firstDayOfMonth);
    startDay.setUTCDate(1 - firstDayOfMonth.getUTCDay());

    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const endDay = new Date(lastDayOfMonth);
    endDay.setUTCDate(lastDayOfMonth.getUTCDate() + (6 - lastDayOfMonth.getUTCDay()));

    const weeks = [];
    let currentWeek = [];
    let currentDateInLoop = new Date(startDay);

    while (currentDateInLoop <= endDay) {
      currentWeek.push(new Date(currentDateInLoop));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentDateInLoop.setUTCDate(currentDateInLoop.getUTCDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const handlePrevMonth2 = () => {
    setCurrentDate2(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setUTCMonth(prevDate.getUTCMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth2 = () => {
    setCurrentDate2(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setUTCMonth(prevDate.getUTCMonth() + 1);
      return newDate;
    });
  };

  const clearDates2 = () => {
    setCheckInDate2(null);
    setCheckOutDate2(null);
  };

  const currentMonthWeeks2 = getCalendarData2(year2, month2);
  const nextMonthWeeks2 = getCalendarData2(year2, month2 + 1);

  const handleDateClick2 = (date) => {
    if (date < today2) {
      return;
    }

    if (!checkInDate2 || (checkInDate2 && checkOutDate2)) {
      setCheckInDate2(date);
      setCheckOutDate2(null);
    } else {
      if (date < checkInDate2) {
        setCheckInDate2(date);
        setCheckOutDate2(null);
      } else {
        setCheckOutDate2(date);
      }
    }
  };

  const isSelected2 = (date) => {
    if (!checkInDate2 || !checkOutDate2) {
      return false;
    }
    return date >= checkInDate2 && date <= checkOutDate2;
  };

  const isCheckIn2 = (date) => {
    return checkInDate2 && date.getTime() === checkInDate2.getTime();
  };

  const isCheckOut2 = (date) => {
    return checkOutDate2 && date.getTime() === checkOutDate2.getTime();
  };

  const formatCheckInDate2 = checkInDate2
    ? checkInDate2.toLocaleDateString('ko-KR')
    : '체크인';

  const formatCheckOutDate2 = checkOutDate2
    ? checkOutDate2.toLocaleDateString('ko-KR')
    : '체크아웃';

  // 외부 클릭 감지 로직 통합
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (peopleRef.current && !peopleRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      if (calendarRef2.current && !calendarRef2.current.contains(event.target) && checkInOutRef2.current && !checkInOutRef2.current.contains(event.target)) {
        setShowCalendar2(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim() !== '') {
      params.append('query', searchQuery.trim());
    }
    params.append('roomCount', roomCount);
    params.append('capacity', capacity);

    navigate(`/room/list?${params.toString()}`);
    setIsCalendarOpen(false);
    setShowCalendar2(false);
  };

  const handleCapacityChange = (change) => {
    setCapacity(prev => Math.max(1, prev + change));
  };

  const handleRoomCountChange = (change) => {
    setRoomCount(prev => Math.max(1, prev + change));
  };

  const handleConfirm = () => {
    setIsCalendarOpen(false);
  };

  const handlePeopleClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
    setShowCalendar2(false);
  };

  const handleCheckInOutClick2 = () => {
    setShowCalendar2(!showCalendar2);
    setIsCalendarOpen(false);
  };

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
              <input
                type="text"
                placeholder="여행지 혹은 숙소명 입력"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='check-in-out' onClick={handleCheckInOutClick2} ref={checkInOutRef2}>
              <img src="/images/check_in.png" alt="체크인 아이콘" width="19px" height="19px" />
              <span>{formatCheckInDate2}</span>
              <img src="/images/check_out.png" alt="체크아웃 아이콘" width="18px" height="18px" />
              <span>{formatCheckOutDate2}</span>
            </div>

            {showCalendar2 && (
              <div className="calendar-wrapper-2" ref={calendarRef2}>
                <div className="calendar-main-container-2">
                  <div className="calendar-container-2">
                    <div className='calendar-header-2'>
                      <button onClick={handlePrevMonth2} className="nav-button-2">&lt;</button>
                      <h2>{currentDate2.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}</h2>
                    </div>
                    <div className="week-days-2">
                      <div className="day">일</div>
                      <div className="day">월</div>
                      <div className="day">화</div>
                      <div className="day">수</div>
                      <div className="day">목</div>
                      <div className="day">금</div>
                      <div className="day">토</div>
                    </div>
                    <div className="calendar-body-2">
                      {currentMonthWeeks2.map((week, weekIndex) => (
                        <div key={weekIndex} className="week-2">
                          {week.map((date, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`day-2 ${date.getUTCMonth() !== month2 ? 'other-month-2' : ''} ${isCheckIn2(date) ? 'selected-2 check-in-2' : ''} ${isCheckOut2(date) ? 'selected-2 check-out-2' : ''} ${isSelected2(date) ? 'in-range-2' : ''} ${date < today2 ? 'disabled-2' : ''}`}
                              onClick={() => handleDateClick2(date)}
                            >
                              {date.getUTCDate()}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="calendar-container-2">
                    <div className='calendar-header-2'>
                      <h2>{new Date(Date.UTC(year2, month2 + 1, 1)).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}</h2>
                      <button onClick={handleNextMonth2} className="nav-button-2">&gt;</button>
                    </div>
                    <div className="week-days-2">
                      <div className="day">일</div>
                      <div className="day">월</div>
                      <div className="day">화</div>
                      <div className="day">수</div>
                      <div className="day">목</div>
                      <div className="day">금</div>
                      <div className="day">토</div>
                    </div>
                    <div className="calendar-body-2">
                      {nextMonthWeeks2.map((week, weekIndex) => (
                        <div key={weekIndex} className="week-2">
                          {week.map((date, dayIndex) => (
                            <div
                              key={dayIndex}
                              className={`day-2 ${date.getUTCMonth() !== month2 + 1 ? 'other-month-2' : ''} ${isCheckIn2(date) ? 'selected-2 check-in-2' : ''} ${isCheckOut2(date) ? 'selected-2 check-out-2' : ''} ${isSelected2(date) ? 'in-range-2' : ''} ${date < today2 ? 'disabled-2' : ''}`}
                              onClick={() => handleDateClick2(date)}
                            >
                              {date.getUTCDate()}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='calendar-action-container'>
                  {(checkInDate2 || checkOutDate2) && (
                    <div className="clear-button-container-2">
                      <button onClick={clearDates2} className="clear-button-2">
                        선택 해제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className='people' ref={peopleRef} onClick={handlePeopleClick}>
              <img src="/images/group.png" alt="인원 아이콘" />
              <span>
                {capacity}명, {roomCount}객실
              </span>

              {isCalendarOpen && (
                <div className='calendar-popup' onClick={(e) => e.stopPropagation()}>
                  <div className='option-row'>
                    <span>성인</span>
                    <div className='counter'>
                      <button onClick={() => handleCapacityChange(-1)}>-</button>
                      <span>{capacity}</span>
                      <button onClick={() => handleCapacityChange(1)}>+</button>
                    </div>
                  </div>
                  <div className='option-row'>
                    <span>객실</span>
                    <div className='counter'>
                      <button onClick={() => handleRoomCountChange(-1)}>-</button>
                      <span>{roomCount}</span>
                      <button onClick={() => handleRoomCountChange(1)}>+</button>
                    </div>
                  </div>
                  <button onClick={handleConfirm} className='confirm-button'>확인</button>
                </div>
              )}
            </div>

            <button onClick={handleSearch} className='search-button'>검색하기</button>
          </div>
        </div>
      )}
    </div>
  );
}