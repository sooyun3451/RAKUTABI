import React, { useState, useEffect, useRef } from 'react';
import '../css/home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isPeopleCalendarOpen, setIsPeopleCalendarOpen] = useState(false);
  const [capacity, setCapacity] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  const peopleRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim() !== '') {
      params.append('query', searchQuery.trim());
    }
    if (checkInDate) {
      params.append('checkIn', checkInDate.toISOString());
    }
    if (checkOutDate) {
      params.append('checkOut', checkOutDate.toISOString());
    }

    params.append('capacity', capacity);
    params.append('roomCount', roomCount);

    navigate(`/room/list?${params.toString()}`);
    setIsPeopleCalendarOpen(false);
  };

  const calendarRef = useRef(null);
  const checkInOutRef = useRef(null);
  const navigate = useNavigate();

  const year = currentDate.getUTCFullYear();
  const month = currentDate.getUTCMonth();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getCalendarData = (year, month) => {
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const startDay = new Date(firstDayOfMonth);
    startDay.setUTCDate(1 - firstDayOfMonth.getUTCDay());

    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const endDay = new Date(lastDayOfMonth);
    endDay.setUTCDate(
      lastDayOfMonth.getUTCDate() + (6 - lastDayOfMonth.getUTCDay())
    );

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

  const handlePeopleClick = () => {
    setIsPeopleCalendarOpen(!isPeopleCalendarOpen);
    setShowCalendar(false);
  };

  const handleCapacityChange = (change) => {
    setCapacity((prev) => Math.max(1, prev + change));
  };

  const handleRoomCountChange = (change) => {
    setRoomCount((prev) => Math.max(1, prev + change));
  };

  const handleConfirmPeople = () => {
    setIsPeopleCalendarOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setUTCMonth(prevDate.getUTCMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setUTCMonth(prevDate.getUTCMonth() + 1);
      return newDate;
    });
  };

  const clearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const currentMonthWeeks = getCalendarData(year, month);
  const nextMonthWeeks = getCalendarData(year, month + 1);

  const handleDateClick = (date) => {
    if (date < today) {
      return;
    }

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else {
      if (date < checkInDate) {
        setCheckInDate(date);
        setCheckOutDate(null);
      } else {
        setCheckOutDate(date);
      }
    }
  };

  const isSelected = (date) => {
    if (!checkInDate || !checkOutDate) {
      return false;
    }
    return date >= checkInDate && date <= checkOutDate;
  };

  const isCheckIn = (date) => {
    return checkInDate && date.getTime() === checkInDate.getTime();
  };

  const isCheckOut = (date) => {
    return checkOutDate && date.getTime() === checkOutDate.getTime();
  };

  const formatCheckInDate = checkInDate
    ? checkInDate.toLocaleDateString('ko-KR')
    : '체크인';

  const formatCheckOutDate = checkOutDate
    ? checkOutDate.toLocaleDateString('ko-KR')
    : '체크아웃';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        checkInOutRef.current &&
        !checkInOutRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
      if (peopleRef.current && !peopleRef.current.contains(event.target)) {
        setIsPeopleCalendarOpen(false);
      }
    };

    if (showCalendar || isPeopleCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, isPeopleCalendarOpen]);

  return (
    <div className="big">
      <div className="bg-img">
        <div className="box">
          <p className="title">일본의 호텔 & 료칸 예약</p>
          <div className="search-container">
            <div className="search">
              <img src="/images/search.png" alt="검색 아이콘" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="여행지 혹은 숙소명 입력"
              ></input>
            </div>
            <div
              className="check-in-out"
              onClick={() => setShowCalendar(!showCalendar)}
              ref={checkInOutRef}
            >
              <div>
              <img
                src="/images/check_in.png"
                alt="체크인 아이콘"
                width="19px"
                height="19px"
              />
              <span>{formatCheckInDate}</span>
              </div>
              <div>
              <img
                src="/images/check_out.png"
                alt="체크아웃 아이콘"
                width="18px"
                height="18px"
              />
              <span>{formatCheckOutDate}</span>
              </div>
            </div>
            <div className="people" ref={peopleRef} onClick={handlePeopleClick}>
              <img src="/images/group.png" alt="인원 아이콘" />
              <span>
                {capacity}명, {roomCount}객실
              </span>
              {isPeopleCalendarOpen && (
                <div
                  className="people-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="option-row">
                    <span>성인</span>
                    <div className="counter">
                      <button onClick={() => handleCapacityChange(-1)}>
                        -
                      </button>
                      <span>{capacity}</span>
                      <button onClick={() => handleCapacityChange(1)}>+</button>
                    </div>
                  </div>
                  <div className="option-row">
                    <span>객실</span>
                    <div className="counter">
                      <button onClick={() => handleRoomCountChange(-1)}>
                        -
                      </button>
                      <span>{roomCount}</span>
                      <button onClick={() => handleRoomCountChange(1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmPeople}
                    className="confirm-button"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
            <button className="search-button" onClick={handleSearch}>
              검색하기
            </button>
          </div>
        </div>
      </div>
      {showCalendar && (
        <div className="calendar-wrapper" ref={calendarRef}>
          <div className="calendar-main-container">
            <div className="calendar-container">
              <div className="calendar-header">
                <button onClick={handlePrevMonth} className="nav-button">
                  &lt;
                </button>
                <h2>
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </h2>
              </div>
              <div className="week-days">
                <div className="day">일</div>
                <div className="day">월</div>
                <div className="day">화</div>
                <div className="day">수</div>
                <div className="day">목</div>
                <div className="day">금</div>
                <div className="day">토</div>
              </div>
              <div className="calendar-body">
                {currentMonthWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="week">
                    {week.map((date, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`day ${
                          date.getUTCMonth() !== month ? 'other-month' : ''
                        } ${isCheckIn(date) ? 'selected check-in' : ''} ${
                          isCheckOut(date) ? 'selected check-out' : ''
                        } ${isSelected(date) ? 'in-range' : ''} ${
                          date < today ? 'disabled' : ''
                        }`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date.getUTCDate()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="calendar-container">
              <div className="calendar-header">
                <h2>
                  {new Date(Date.UTC(year, month + 1, 1)).toLocaleDateString(
                    'ko-KR',
                    { year: 'numeric', month: 'long' }
                  )}
                </h2>
                <button onClick={handleNextMonth} className="nav-button">
                  &gt;
                </button>
              </div>
              <div className="week-days">
                <div className="day">일</div>
                <div className="day">월</div>
                <div className="day">화</div>
                <div className="day">수</div>
                <div className="day">목</div>
                <div className="day">금</div>
                <div className="day">토</div>
              </div>
              <div className="calendar-body">
                {nextMonthWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="week">
                    {week.map((date, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`day ${
                          date.getUTCMonth() !== month + 1 ? 'other-month' : ''
                        } ${isCheckIn(date) ? 'selected check-in' : ''} ${
                          isCheckOut(date) ? 'selected check-out' : ''
                        } ${isSelected(date) ? 'in-range' : ''} ${
                          date < today ? 'disabled' : ''
                        }`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date.getUTCDate()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {(checkInDate || checkOutDate) && (
            <div className="clear-button-container">
              <button onClick={clearDates} className="clear-button">
                선택 해제
              </button>
            </div>
          )}
        </div>
      )}
      <div className="ad-title">여행은 역시 라쿠타비!</div>
      <div className="ad-all">
        <div className="slider-wrapper">
          <ul
            className="ad-list"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <li>
              <div className="ad-item-content">
                <img src="public/images/1st_icon.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">신뢰할 수 있는 플랫폼</p>
                  <p>
                    전 세계 16억 회원을 보유한 라쿠타비
                    <br /> 온라인 여행 플랫폼
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-item-content">
                <img src="public/images/flower_icon.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">다양한 숙소</p>
                  <p>
                    일본의 수많은 호텔,료칸 등<br /> 다양한 숙소 비교·검색기능
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-item-content">
                <img src="public/images/present_icon.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">특가 상품</p>
                  <p>
                    라쿠타비 트래블에서만 예약 가능한
                    <br /> 독점 특가 및 숙박 상품
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-item-content">
                <img src="public/images/for_group_icon.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">회원 혜택</p>
                  <p>
                    무료 회원 가입하고 누리는 할인
                    <br /> 쿠폰 등의 회원 전용 혜택
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-item-content">
                <img src="public/images/great_icon.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">라쿠타비 트래블 어워드</p>
                  <p>
                    우수한 서비스를 제공하는 숙소에 <br />
                    수여하는 '라쿠타비
                    <br /> 트래블 어워드'(Rakutabi Travel Award)
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="ad-item-content">
                <img src="public/images/japan_trip.png" alt="" />
                <div className="ad-text-content">
                  <p className="icon-title">재팬 퀄리티</p>
                  <p>
                    일본만의 고품격 서비스(오모테나시)를 제공하는 숙소에 <br />
                    부여하는 '재팬 퀄리티'(Japan Quality) 마크
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="slider-nav">
          <button onClick={handlePrevSlide}>&lt;</button>
          <button onClick={handleNextSlide}>&gt;</button>
        </div>
      </div>
      <div className="restaurant">
        <div className="res-text">식당 추천</div>
        <div className="res-img">
          <li>
            <Link to="/restaurant/region/도쿄">
              <img src="public/images/tokyo.jpg" alt="tokyo" />
            </Link>
            <p>도쿄</p>
          </li>
          <li>
            <Link to="/restaurant/region/오사카">
              <img src="public/images/osaka.jpg" alt="osaka" />
            </Link>
            <p>오사카</p>
          </li>
          <li>
            <Link to="/restaurant/region/삿포로">
              <img src="public/images/sapporo.jpg" alt="sappro" />
            </Link>
            <p>삿포로</p>
          </li>
          <li>
            <Link to="/restaurant/region/후쿠오카">
              <img src="public/images/fukuoka.jpg" alt="fukuoka" />
            </Link>
            <p>후쿠오카</p>
          </li>
          <li>
            <Link to="/restaurant/region/오키나와">
              <img src="public/images/okinawa.jpg" alt="okinawa" />
            </Link>
            <p>오키나와</p>
          </li>
        </div>
      </div>
    </div>
  );
}
