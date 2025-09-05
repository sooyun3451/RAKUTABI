import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/room_detail.css";

export default function RoomDetail() {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [reviewFilter, setReviewFilter] = useState([]);
    const [sortOrder, setSortOrder] = useState("latest");
    const { id } = useParams();

    useEffect(() => {
        fetch("/data/room.json")
            .then((res) => res.json())
            .then((data) => {
                const updatedData = data.map((hotel) => ({
                    ...hotel,
                    rooms: [...hotel.room1, ...hotel.room2].map((room) => ({
                        ...room,
                        availableRooms: room["roomCount"],
                    })),
                }));

                setHotels(updatedData);
                const found = updatedData.find(
                    (h) => Number(h.hotelId) === Number(id)
                );
                setSelectedHotel(found || updatedData[0]);
            })
            .catch((err) => {
                console.error("[RoomDetail] fetch error:", err);
            });
    }, [id]);

    useEffect(() => {
        if (!hotels || hotels.length === 0) return;
        const found = hotels.find((h) => Number(h.hotelId) === Number(id));
        if (
            found &&
            (!selectedHotel || selectedHotel.hotelId !== found.hotelId)
        ) {
            setSelectedHotel(found);
        }
    }, [hotels, id]);

    if (!selectedHotel) return <div>Loading...</div>;
    const hotel = selectedHotel;
    const allReviews = [...hotel.review1, ...hotel.review2];

    const filteredReviews =
        reviewFilter.length > 0
            ? allReviews.filter((r) => reviewFilter.includes(r.score))
            : allReviews;
    const avgScore =
        allReviews.length > 0
            ? allReviews.reduce((sum, r) => sum + r.score, 0) /
              allReviews.length
            : 0;

   
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortOrder === "latest") {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOrder === "oldest") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortOrder === "score Top") {
            return b.score - a.score;
        } else if (sortOrder === "score Bottom") {
            return a.score - b.score;
    }});

    const handleBookRoom = (roomId) => {
        // 상태 업데이트 로직 수정: hotel 객체를 복사하고 rooms 배열을 업데이트합니다.
        const updatedRooms = hotel.rooms.map((room) =>
            room.roomId === roomId && room.availableRooms > 0
                ? { ...room, availableRooms: room.availableRooms - 1 }
                : room
        );

        setSelectedHotel({
            ...hotel,
            rooms: updatedRooms,
        });
        alert("객실이 예약되었습니다!");
    };

    const getScoreLabel = (score) => {
        if (score >= 4.0) return { text: "매우 훌륭함", cls: "excellent" };
        if (score >= 3.0) return { text: "훌륭함", cls: "good" };
        if (score >= 2.0) return { text: "보통", cls: "average" };
        return { text: "최악", cls: "poor" };
    };

    const facilityLabels = {
        parking: "주차",
        sauna: "사우나",
        "spa/hairdresser": "스파/미용실",
        pool: "수영장",
        "late-night-meal": "야간식사",
        "banquet hall": "연회장",
        "open-air-bath": "노천탕",
    };
    const serviceLabels = {
        "parcel service": "택배 서비스",
        "moring-call": "모닝콜",
        fax: "팩스",
    };
    const languageLabels = {
        english: "영어",
        japanese: "일본어",
        korean: "한국어",
    };

    return (
        <div className="room-detail">
            {/* 1. 호텔 이미지 섹션 */}
            <div className="hotel-summary">
                <div className="hotel-images">
                    <div>
                        <img src={hotel.img1} alt="hotel" />
                    </div>
                    <div>
                        <img src={hotel.img2} alt="lobby" />
                    </div>
                    <div>
                        <img src={hotel.img3} alt="room" />
                    </div>
                </div>
            </div>
            {/* 2. 네비게이션 컨테이너 (여기를 바깥으로 빼야 합니다!) */}
            <div className="sticky-nav-container">
                <div className="navi sticky-navi">
                    <button
                        onClick={() =>
                            document
                                .getElementById("section-overview")
                                .scrollIntoView({ behavior: "smooth" })
                        }>
                        개요
                    </button>
                    <button
                        onClick={() =>
                            document
                                .getElementById("section-rooms")
                                .scrollIntoView({ behavior: "smooth" })
                        }>
                        객실&숙박상품
                    </button>
                    <button
                        onClick={() =>
                            document
                                .getElementById("section-reviews")
                                .scrollIntoView({ behavior: "smooth" })
                        }>
                        이용후기
                    </button>
                    <button
                        onClick={() =>
                            document
                                .getElementById("section-services")
                                .scrollIntoView({ behavior: "smooth" })
                        }>
                        편의시설/서비스
                    </button>
                </div>
            </div>
            {/* 3. 호텔 정보 (개요) 섹션 - 네비게이션 컨테이너와 분리 */}
            <div id="section-overview" className="hotel-info">
                <h2>{hotel.hotelName}</h2>
                <div id="item-box" className="hotel-meta">
                    <div className="circle-review">
                        <div className="circle-score">
                            <div className="address">
                                <p className="address">{hotel.address}</p>
                                <p>{hotel.content}</p>
                            </div>
                            <div
                                className="circle-progress"
                                style={{
                                    background: `conic-gradient(#4caf50 ${(
                                        (avgScore / 5) *
                                        360
                                    ).toFixed(2)}deg, #eee 0deg)`,
                                }}>
                                <span>{avgScore.toFixed(1)}</span>
                            </div>
                            {(() => {
                                const label = getScoreLabel(avgScore);
                                return (
                                    <div
                                        className={`score-label ${label.cls}`}
                                        aria-hidden>
                                        <strong>{label.text}</strong>
                                        <div className="score-note">
                                            y 평균 {avgScore.toFixed(1)}점
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                    <div className="convenient">
                        <h3>숙소 편의 시설/서비스</h3>
                        <div className="convenient-list">
                            {hotel["convenientFacilities"] &&
                                hotel["convenientFacilities"][0] &&
                                (() => {
                                    const defs = {
                                        parking: { label: "주차", icon: "🅿️" },
                                        sauna: { label: "사우나", icon: "♨️" },
                                        "spa/hairdresser": {
                                            label: "스파/미용",
                                            icon: "💆",
                                        },
                                        pool: { label: "수영장", icon: "🏊" },
                                        "late-night-meal": {
                                            label: "심야식사",
                                            icon: "🌙",
                                        },
                                        "banquet hall": {
                                            label: "연회장",
                                            icon: "🎉",
                                        },
                                        "open-air-bath": {
                                            label: "노천탕",
                                            icon: "🛁",
                                        },
                                    };
                                    const avail =
                                        hotel["convenientFacilities"][0];
                                    const items = Object.keys(defs).filter(
                                        (k) => avail[k] === true
                                    );
                                    if (!items.length) return null;
                                    return (
                                        <div
                                            className="facility-grid"
                                            aria-hidden>
                                            {items.map((k) => (
                                                <div
                                                    key={k}
                                                    className="facility-item">
                                                    <span
                                                        className="facility-icon"
                                                        aria-hidden>
                                                        {defs[k].icon}
                                                    </span>
                                                    <span className="facility-label">
                                                        {defs[k].label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })()}
                        </div>
                    </div>
                </div>
                {/* 객실 섹션 */}
                <h3 className="section-title" id="section-rooms">
                    객실과 숙박 상품
                </h3>
                <div className="room-section">
                    {hotel.rooms.map((room) => (
                        <div key={room.roomId} className="room-card">
                            <div className="room-photo">
                                <img src={room["img1-1"]} alt="room" />
                            </div>
                            <div className="room-main-info">
                                <div className="room-title">
                                    <strong>{room.roomName}</strong>
                                    {room.smoking ? (
                                        <span className="room-badge">
                                            🚬 흡연
                                        </span>
                                    ) : (
                                        <span className="room-badge non-smoking">
                                            🚭️ 금연
                                        </span>
                                    )}
                                    <strong>{room.name}</strong>
                                    {room.bed === 1 ? (
                                        <span className="one-bed">
                                            🛏️ 원베드
                                        </span>
                                    ) : (
                                        <span className=" one-bed two-bed">
                                            🛏️ 투베드
                                        </span>
                                    )}
                                    {room.breakfast ? (
                                        <span className="room-breakfast">
                                            🍚 조식
                                        </span>
                                    ) : (
                                        <span className="room-breakfast noon-breakfast">
                                            ❌조식없음
                                        </span>
                                    )}
                                </div>
                                <div className="room-summary">
                                    <span>면적: {room.roomSize}</span>
                                    <span>최대 성인 {room.maxCapa}명</span>
                                </div>
                                <div className="room-facilities">
                                    <span>🛁 욕실 및 화장실 있음</span>
                                    <span>🌐 객실 내 인터넷 이용 가능</span>
                                    {room["ocean view"] && (
                                        <span>🌊 오션뷰</span>
                                    )}
                                    {room["노천탕"] && (
                                        <span>♨ 노천탕이 있는 객실</span>
                                    )}
                                </div>
                            </div>
                            <div className="room-price">
                                <p>
                                    <span className="room-origin-price">
                                        {room.originPrice && (
                                            <s>
                                                {room.originPrice.toLocaleString()}
                                                원
                                            </s>
                                        )}
                                    </span>
                                    <span className="room-sale-price">
                                        {room.price.toLocaleString()}원
                                    </span>
                                    <span className="room-per-night">
                                        / 1박
                                    </span>
                                </p>
                                <div className="room-availability">
                                    <span className="roomCount-text">
                                        남은 객실: {room.availableRooms}개
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleBookRoom(room.roomId)}
                                    disabled={room.availableRooms <= 0}>
                                    {room.availableRooms <= 0
                                        ? "예약 마감"
                                        : "예약"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 리뷰 섹션 */}
                <div className="review-section" id="section-reviews">
                    <h3>투숙객 평점 및 이용후기</h3>
                    <div className="review-header">
                        <div className="circle-score">
                            <div
                                className="circle-progress"
                                style={{
                                    background: `conic-gradient(#4caf50 ${(
                                        (avgScore / 5) *
                                        360
                                    ).toFixed(2)}deg, #eee 0deg)`,
                                }}>
                                <span>{avgScore.toFixed(1)}</span>
                            </div>
                            {(() => {
                                const label = getScoreLabel(avgScore);
                                return (
                                    <div
                                        className={`score-label ${label.cls}`}
                                        aria-hidden>
                                        <strong>{label.text}</strong>
                                        <div className="score-note">
                                            평균 {avgScore.toFixed(1)}점
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        <div className="review-filters">
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{ marginLeft: 10 }}>
                                <option value="">전체 평점</option>
                                <option value={"score Top"}>평점 높은순</option>
                                <option value={"score Bottom"}>
                                    평점 낮은순
                                </option>
                            </select>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{ marginLeft: 10 }}>
                                <option value="latest">최신순</option>
                                <option value="oldest">과거순</option>
                            </select>
                        </div>
                    </div>
                    <div className="review-list">
                        {sortedReviews.map((r, idx) => (
                            <div key={idx} className="review-card">
                                <div className="review-content">
                                    <div className="review-top">
                                        <span className="review-user">
                                            {r.user}
                                        </span>
                                    </div>
                                    <p>{r.comment}</p>
                                    <small>{r.date}</small>
                                </div>
                                <div
                                    className="review-score-circle"
                                    aria-hidden
                                    style={{
                                        background: `conic-gradient(#4caf50 ${(
                                            (r.score / 5) *
                                            360
                                        ).toFixed(2)}deg, #eee 0deg)`,
                                    }}>
                                    <span>{r.score}</span>
                                </div>
                                {(() => {
                                    const label = getScoreLabel(r.score);
                                    return (
                                        <div
                                            className={`score-label ${label.cls}`}
                                            aria-hidden>
                                            <strong>{label.text}</strong>
                                        </div>
                                    );
                                })()}
                            </div>
                        ))}
                    </div>
                </div>
                <div id="section-services" className="section">
                    <h2>특징 및 편의시설 서비스</h2>
                    <ul className="conven-list">
                        <h4>시설</h4>
                        {hotel["convenientFacilities"].map(
                            (facility, index) => (
                                <li key={index}>
                                    {Object.entries(facility).map(
                                        ([key, value]) => (
                                            <span key={key}>
                                                {facilityLabels[key] || key}:{" "}
                                                {value ? "☑" : "☐"}
                                            </span>
                                        )
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                    <ul className="facilities">
                        <h4>시설 제공 서비스</h4>
                        {hotel["Facilities provision services"].map(
                            (provision, index) => (
                                <li key={index}>
                                    {Object.entries(provision).map(
                                        ([key, value]) => (
                                            <span key={key}>
                                                {serviceLabels[key] || key}:{" "}
                                                {value ? "☑" : "☐"}
                                            </span>
                                        )
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                    <ul className="languages">
                        <h4>응답 언어</h4>
                        {hotel["a responsive language"].map(
                            (language, index) => (
                                <li key={index}>
                                    {Object.entries(language).map(
                                        ([key, value]) => (
                                            <span key={key}>
                                                {languageLabels[key] || key}:{" "}
                                                {value ? "☑" : "☐"}
                                            </span>
                                        )
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
