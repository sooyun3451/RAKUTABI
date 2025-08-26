import React from "react";
import "./RoomDetail.css"

export default function roomDetail() {
    return (
        <div className="room-detail">
            <div className="data-component"></div>//사진
            <div className="provider-information-contentbox">
                <div className="navi"></div> //개요 객실 이용후기
                <div className="data-tast-id">
                    <div className="summary-wapper">
                        <div className="star"></div>
                        <div className="hotel-title">호텔 리조피아 아타미</div>
                        <div className="addres-map"></div>
                        <div className="content"></div>
                    </div>
                    <div className="over-view-wapper">
                        <div className="over-verview">
                            //동그라미
                            <div className="ReView-content"></div>
                            <div className="circle"></div>
                        </div>
                        <div className="ontainer"></div> //접근성
                        <div className="servic-conven">
                            <h3 className="over-view"> 숙소 편의시설/서비스</h3>
                            <div data-taestid></div>
                        </div>
                        //숙소,서비스시설
                        <div className="roomandplanList-wrapper">
                            <h2 className="room-title">
                                <span>객실과숙박 상품을 확인하세요.</span>
                            </h2>
                            <div className="room-planList-stick">
                                <div className="horizontal-nav">
                                    <div className="select-box">
                                        <input
                                            type="hidden"
                                            name="sortselectbox"
                                        />
                                        <span>가격 낮은순</span>
                                    </div>
                                    <div className="breakfast">
                                        <button>조식</button>
                                    </div>
                                    <div className="ocean-view">
                                        <button>오션뷰</button>
                                    </div>
                                    <div className="somking-">
                                        <button>금연</button>
                                    </div>
                                </div>
                            </div>
                            <div className="room-and-planList-contentbox">
                                <div className="room-list-wrapper">
                                    <span>객실정보 :개</span>
                                    <div>
                                        <div className="room-list">
                                            <div className="room-left">
                                                <div className="roomPlanlt-header"></div>
                                                <div className="roomPlant-photo-detail">
                                                    <div className="room-plant-photo">
                                                        <div id=""></div>
                                                    </div>
                                                    <div className="room-photo-foot">
                                                        <div className="room-List-roombasic">
                                                            <div className="somkint-room">
                                                                <div className="icon-text">
                                                                    <span
                                                                        false></span>
                                                                    <span>
                                                                        금연
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="oceanview-room">
                                                                <div className="icon-text">
                                                                    <span
                                                                        false></span>
                                                                    <span>
                                                                        오션뷰
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="with-out-tage">
                                                            <div className="room-basic-icinfosummary">
                                                                <span
                                                                    true></span>
                                                                <span>
                                                                    쵀대2명
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="room-right">
                                                <ul plan-item-room-list>
                                                    <li className="room-list-plan-item-H45">
                                                        <div className="planitem-card">
                                                            <div className="card-wapper-oi">
                                                                <div className="room-plan-item-wrapper-bwa">
                                                                    <div className="room-plan-item-wrapper-bwa-u0">
                                                                        <div className="room-plan-item-wrapper-bwa-u0-img"></div>
                                                                        <div className="room-plan-item-wrapper-bwa-u0-write"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="room-paln-item-wapper-price">
                                                                    <div className="room-preice-info-pper">
                                                                        <div>
                                                                            <div className="card-label">
                                                                                요금기준:
                                                                                1빅
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="room-price-info-reserve">
                                                                        <div className="room-price-info-tax">
                                                                            <div>
                                                                                <div className="room-price-unitprice">
                                                                                    80000원
                                                                                </div>
                                                                                <span>
                                                                                    세금및
                                                                                    봉사료
                                                                                    포함
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="room-price-info-reserve-button">
                                                                            <button>
                                                                                <span>
                                                                                    예약
                                                                                </span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="provider-information-review">
                <div className="provider-information-review-content-box">
                    <h2>투수객 평점및 이용후기.</h2>
                    <div className="proeve-review-wrapper">
                        <div className="review-circle-scorel">
                            <div className="review-circle"></div>
                        </div>
                        <div className="review-list-wrapper">
                            <div className="filter-lsit-wrapper">
                                <div className="review-filter">
                                    <div className="review-filter-wrapper">
                                        <div className="filter-container-9k">
                                            <div className="select-box-sort-time">
                                                <input
                                                    type="hidden"
                                                    name="sortby"
                                                />
                                                <div className="style-select-box-display">
                                                    <span className="style-selectox">
                                                        최신순
                                                    </span>
                                                    <svg></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-container-9k">
                                            <button className="filter-sort-review">
                                                <button className="filter-display-box">
                                                    <span>투수객 평점</span>
                                                    <svg></svg>
                                                </button>
                                                <div className="poppu-poppu"></div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="filter-and-sory">
                                        <div className="filter-popup-content">
                                            <label className="check-box-inner">
                                                <input
                                                    type="checkbox"
                                                    data-testid="평점5점"
                                                />
                                                <div className="check-box-lcon">
                                                    <svg></svg>
                                                </div>
                                                <span id="filter-option-5">
                                                    평점5점
                                                </span>{" "}
                                            </label>
                                            <label className="check-box-inner">
                                                <input
                                                    type="checkbox"
                                                    data-testid="평점4점"
                                                />
                                                <div className="check-box-lcon">
                                                    <svg></svg>
                                                </div>
                                                <span id="filter-option-4">
                                                    평점4점
                                                </span>{" "}
                                            </label>
                                            <label className="check-box-inner">
                                                <input
                                                    type="checkbox"
                                                    data-testid="평점3점"
                                                />
                                                <div className="check-box-lcon">
                                                    <svg></svg>
                                                </div>
                                                <span id="filter-option-3">
                                                    평점3점
                                                </span>{" "}
                                            </label>
                                            <label className="check-box-inner">
                                                <input
                                                    type="checkbox"
                                                    data-testid="평점2점"
                                                />
                                                <div className="check-box-lcon">
                                                    <svg></svg>
                                                </div>
                                                <span id="filter-option-2">
                                                    평점2점
                                                </span>{" "}
                                            </label>
                                            <label className="check-box-inner">
                                                <input
                                                    type="checkbox"
                                                    data-testid="평점1점"
                                                />
                                                <div className="check-box-lcon">
                                                    <svg></svg>
                                                </div>
                                                <span id="filter-option-1">
                                                    평점1점
                                                </span>{" "}
                                            </label>
                                        </div>
                                    </div>{" "}
                                    //뛰우는 친구
                                </div>
                                <ol>
                                    <li>
                                        <div className="review-card-wrapper-review">
                                            <div className="review-card-user-info">
                                                <div className="review-card-reviewer">
                                                    <div className="review-use-data-item">
                                                        <span>name</span>
                                                    </div>
                                                </div>
                                                <div className="cicle-score-wrapper">
                                                    <div className="review-card-score-text">
                                                        5
                                                    </div>
                                                    <div className="circle-score-svgbox">
                                                        <svg>
                                                            <circle></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-card-detail-wrapper"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="review-card-wrapper-review">
                                            <div className="review-card-user-info">
                                                <div className="review-card-reviewer">
                                                    <div className="review-use-data-item">
                                                        <span>name</span>
                                                    </div>
                                                </div>
                                                <div className="cicle-score-wrapper">
                                                    <div className="review-card-score-text">
                                                        5
                                                    </div>
                                                    <div className="circle-score-svgbox">
                                                        <svg>
                                                            <circle></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-card-detail-wrapper"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="review-card-wrapper-review">
                                            <div className="review-card-user-info">
                                                <div className="review-card-reviewer">
                                                    <div className="review-use-data-item">
                                                        <span>name</span>
                                                    </div>
                                                </div>
                                                <div className="cicle-score-wrapper">
                                                    <div className="review-card-score-text">
                                                        5
                                                    </div>
                                                    <div className="circle-score-svgbox">
                                                        <svg>
                                                            <circle></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-card-detail-wrapper"></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="review-card-wrapper-review">
                                            <div className="review-card-user-info">
                                                <div className="review-card-reviewer">
                                                    <div className="review-use-data-item">
                                                        <span>name</span>
                                                    </div>
                                                </div>
                                                <div className="cicle-score-wrapper">
                                                    <div className="review-card-score-text">
                                                        5
                                                    </div>
                                                    <div className="circle-score-svgbox">
                                                        <svg>
                                                            <circle></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-card-detail-wrapper"></div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
