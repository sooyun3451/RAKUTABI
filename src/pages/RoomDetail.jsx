import React from "react";

export default function RoomDetail() {
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
                    <div className="over-verview">//동그라미
                        <div className="ReView-content"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="ontainer"></div> //접근성
                    <div className="servic-conven">
                        <h3 className="over-view"> 숙소 편의시설/서비스</h3>
                        <div data-taestid></div>    
                    </div>//숙소,서비스시설
                </div>
              </div>
            </div>
        </div>
    );
}
