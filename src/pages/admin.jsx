import React from 'react';
import '../css/admin.css';

export default function Admin() {
  return (
    <>
      
      <div className='admin-big-title'>
        <div className='admin-left-side'>
          <div className='admin-img-wrap'>
            <img src="public\images\admin_img.png" alt="관리자 이미지" />
          </div>
          <p className='admin-txt'>Admin</p>
          <div className='admin-icon-group'>
            <img src="public\images\home_icon.png" alt="홈 아이콘" />
            <img src="public\images\go_out.png" alt="나가기 아이콘" />
          </div>
          <div className='admin-left-tap'>
            <ul>
                <li>
                <img src="public\images\home_icon.png" alt="" />
                <p>관리자 메인</p>
                </li>
                <li>
                <img src="public\images\people_icon.png" alt="" />
                <p>회원관리</p>
                </li>
                <li>
                <img src="public\images\house_icon.png" alt="" />
                <p>숙소관리</p>
                </li>
                <li>
                <img src="public\images\review_icon.png" alt="" />
                <p>식당 리뷰 관리</p>
                </li>
            </ul>
          </div>
        </div>
        <div className='admin-right-section'>
          <div className='admin-right-side-top'>
            <div className='admin-right-top-tap'></div>
            <div></div>
          </div>
          <div className='admin-right-side-bottom'></div>
        </div>
      </div>
    </>
  );
}