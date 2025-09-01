import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RoomDetail.css";

export default function RoomDetail() {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [reviewFilter, setReviewFilter] = useState([]);
    const [sortOrder, setSortOrder] = useState("latest");
    const [bookedRooms, setBookedRooms] = useState(0); // 예약된 객실 수 상태 추가
    const { id } = useParams();

    // fetch 후 id에 맞는 호텔을 정확히 찾아 설정하도록 개선
    useEffect(() => {
        fetch("/data/room.json")
            .then((res) => res.json())
            .then((data) => {
                setHotels(data);
                const findById = (list, targetId) =>
                    list.find(
                        (h) =>
                            Number(h.hotelId) === Number(targetId) ||
                            String(h.hotelId).trim() === String(targetId).trim()
                    );

                const found = findById(data, id);
                if (!found) {
                    console.warn(
                        "[RoomDetail] hotel not found for id:",
                        id,
                        "available ids:",
                        data.map((h) => h.hotelId)
                    );
                }
                setSelectedHotel(found || data[0]);
            })
            .catch((err) => {
                console.error("[RoomDetail] fetch error:", err);
            });
    }, [id]);

    // (안전장치) hotels가 나중에 업데이트될 경우에도 id에 맞게 selectedHotel 보정
    useEffect(() => {
        if (!hotels || hotels.length === 0) return;
        const found = hotels.find(
            (h) =>
                Number(h.hotelId) === Number(id) ||
                String(h.hotelId).trim() === String(id).trim()
        );
        if (found && (!selectedHotel || selectedHotel.hotelId !== found.hotelId)) {
            setSelectedHotel(found);
        }
    }, [hotels, id]);

    if (!selectedHotel) return <div>Loading...</div>;

    const hotel = selectedHotel;

    // 모든 리뷰 모으기
    const allReviews = [...hotel.review1, ...hotel.review2];

    // 평점 필터 적용
    const filteredReviews =
        reviewFilter.length > 0
            ? allReviews.filter((r) => reviewFilter.includes(r.score))
            : allReviews;

    // 평균 평점
    const avgScore =
        allReviews.length > 0
            ? allReviews.reduce((sum, r) => sum + r.score, 0) /
              allReviews.length
            : 0;
    const toggleFilter = (score) => {
        setReviewFilter((prev) =>
            prev.includes(score)
                ? prev.filter((s) => s !== score)
                : [...prev, score]
        );
    };
    // 정렬된 리뷰 만들기
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortOrder === "latest") {
            return new Date(b.date) - new Date(a.date);
        } else {
            return new Date(a.date) - new Date(b.date);
        }
    });

    // 예약 버튼 클릭 핸들러
    const handleBookRoom = () => {
        if (bookedRooms < hotel.totalRoomNumber) {
            setBookedRooms(bookedRooms + 1);
            alert("객실이 예약되었습니다!");
        }
    };

    const getScoreLabel = (score) => {
        if (score >= 4.0) return { text: "매우 훌륭함", cls: "excellent" };
        if (score >= 3.0) return { text: "훌륭함", cls: "good" };
        if (score >= 2.0) return { text: "보통", cls: "average" };
        return { text: "최악", cls: "poor" };
    };

    return (
        <div className="room-detail">
            {/* 호텔 개요 */}
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
                <div className="navi sticky-navi">
                    <div className="outline">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("section-overview")
                                    .scrollIntoView({ behavior: "smooth" })
                            }>
                            개요
                        </button>
                    </div>
                    <div className="rooms-accommodation-products">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("section-rooms")
                                    .scrollIntoView({ behavior: "smooth" })
                            }>
                            객실&숙박상품
                        </button>
                    </div>
                    <div className="navi-Reviews">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("section-reviews")
                                    .scrollIntoView({ behavior: "smooth" })
                            }>
                            이용후기
                        </button>
                    </div>
                    <div className="room-look">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("section-reviews")
                                    .scrollIntoView({ behavior: "smooth" })
                            }>
                            <span>객실보기</span>
                        </button>
                    </div>
                </div>
                <div id="section-overview" className="hotel-info">
                    <h2>{hotel.hotelName}</h2>
                </div>

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
                                            평균 {avgScore.toFixed(1)}점
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                    {/* 점수 레이블 (숫자 옆 표시) */}

                    <div className="convenient">
                        <h3>숙소 편의 시설/서비스</h3>
                        <div className="convenient-list">
                            {hotel["convenient facilities"] &&
                                hotel["convenient facilities"][0] && (() => {
                                    const defs = {
                                        parking: { label: "주차", icon: "🅿️" },
                                        sauna: { label: "사우나", icon: "♨️" },
                                        "spa/hairdresser": { label: "스파/미용", icon: "💆" },
                                        pool: { label: "수영장", icon: "🏊" },
                                        "late-night-meal": { label: "심야식사", icon: "🌙" },
                                        "banquet hall": { label: "연회장", icon: "🎉" },
                                        "open-air-bath": { label: "노천탕", icon: "🛁" },
                                    };
                                    const avail = hotel["convenient facilities"][0];
                                    // 정의된 순서대로 true 항목만 표시
                                    const items = Object.keys(defs).filter((k) => avail[k] === true);
                                    if (!items.length) return null;
                                    return (
                                        <div className="facility-grid" aria-hidden>
                                            {items.map((k) => (
                                                <div key={k} className="facility-item">
                                                    <span className="facility-icon" aria-hidden>
                                                        {defs[k].icon}
                                                    </span>
                                                    <span className="facility-label">{defs[k].label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* 객실 */}
            <h3 className="section-title" id="section-rooms">
                객실과 숙박 상품
            </h3>
            <div className="room-section">
                {[...hotel.room1, ...hotel.room2].map((room) => (
                    <div key={room.roomId} className="room-card">
                        {/* 좌측: 객실 이미지 */}
                        <div className="room-photo">
                            <img src={room["img1-1"]} alt="room" />
                        </div>
                        {/* 중앙: 객실 정보 */}
                        <div className="room-main-info">
                            <div className="room-title">
                                <strong>{room.name}</strong>
                                {room.smoking ? (
                                    <span className="room-badge">흡연</span>
                                ) : (
                                    <span className="room-badge non-smoking">
                                        금연
                                    </span>
                                )}
                            </div>
                            <div className="room-summary">
                                <span>면적: {room.size}㎡</span>
                                <span>최대 성인 {room.maxCapa}명</span>
                                {/* 필요시 아동 정보 등 추가 */}
                            </div>
                            <div className="room-facilities">
                                <span>🛁 욕실 및 화장실 있음</span>
                                <span>🌐 객실 내 인터넷 이용 가능</span>
                                {room["ocean view"] && <span>🌊 오션뷰</span>}
                                {room["노천탕"] && (
                                    <span>♨ 노천탕이 있는 객실</span>
                                )}
                            </div>
                        </div>
                        {/* 우측: 가격 및 예약 */}
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
                                <span className="room-per-night">/ 1박</span>
                            </p>
                            <button
                                onClick={handleBookRoom}
                                disabled={bookedRooms >= hotel.totalRoomNumber}>
                                예약
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 리뷰 */}
            <div className="review-section" id="section-reviews">
                <h3>투숙객 평점 및 이용후기</h3>
                <div className="review-header">
                    <div className="circle-score">
                        <div
                            className="circle-progress"
                            style={{
                                background: `conic-gradient(#4caf50 ${
                                    (avgScore / 5) * 360
                                }deg, #eee 0deg)`,
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
                            value={reviewFilter[0] || ""}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                setReviewFilter(val ? [val] : []);
                            }}>
                            <option value="">전체 평점</option>
                            {[5, 4, 3, 2, 1].map((s) => (
                                <option key={s} value={s}>
                                    평점 {s}점
                                </option>
                            ))}
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
                                const label = getScoreLabel(avgScore);
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
        </div>
    );
}
