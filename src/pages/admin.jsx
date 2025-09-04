import React, { useState } from 'react';
import '../css/admin.css';
import { Link } from 'react-router-dom';
import { AdminUser, AdminHotel, AdminReview } from '../components';

export default function Admin() {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState('main');

  const renderContent = () => {
    switch (currentTab) {
      case 'main':
        return (
          <>
            <div className='admin-member-list'>
              <div className='admin-list-txt'>신규가입회원 5건 목록</div>
              <div className='admin-list-txt2'>총 회원수 1명 중 차단 0명, 탈퇴 :0명</div>
              <table className='admin-table'>
                <tr>
                  <th scope='col'>회원아이디</th>
                  <th scope='col'>이름</th>
                  <th scope='col'>닉네임</th>
                  <th scope='col'>권한</th>
                  <th scope='col'>포인트</th>
                  <th scope='col'>수신</th>
                  <th scope='col'>공개</th>
                  <th scope='col'>인증</th>
                  <th scope='col'>차단</th>
                  <th scope='col'>그룹</th>
                </tr>
                <tr>
                  <td>admin</td>
                  <td>최고관리자</td>
                  <td>최고관리자</td>
                  <td>10</td>
                  <td>1,510</td>
                  <td>예</td>
                  <td>예</td>
                  <td>아니오</td>
                  <td>아니오</td>
                  <td></td>
                </tr>
              </table>
              <button className='admin-member-all'>회원 전체보기</button>
            </div>
            <div className='admin-member-list-2'>
              <div className='admin-bed-txt'>최근 숙소 변경</div>
              <table className='admin-bed-table'>
                <tr>
                  <th scope='col'>지역</th>
                  <th scope='col'>이름</th>
                  <th scope='col'>변경사유</th>
                  <th scope='col'>변경내역</th>
                  <th scope='col'>변경일자</th>
                </tr>
                <tr>
                  <td>오키나와</td>
                  <td>오키나와 비치 호텔</td>
                  <td>가격표기오류</td>
                  <td>280,000원/1박 ='{'>'}'320,000원/1박</td>
                  <td>2025-09-04</td>
                </tr>
              </table>
              <button className='admin-bed-all'>숙소 전체보기</button>
            </div>
          </>
        );
      case 'users':
        return <AdminUser />;
      case 'hotels':
        return <AdminHotel />;
      case 'reviews':
        return <AdminReview />;
      default:
        return null;
    }
  };

  const handleToggleLeftTap = () => {
    setIsLeftTapOpen(!isLeftTapOpen);
  };

  const buttomStyle = {
    height: isLeftTapOpen ? '76px' : '76px',
  };

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <div className={`admin-big-title ${isLeftTapOpen ? 'closed' : ''}`}>
        <div className={`admin-left-side ${!isLeftTapOpen ? 'closed' : ''}`}>
          <div className='admin-img-wrap'>
            <img src='public\images\admin_img.png' alt='관리자 이미지' />
          </div>
          <p className='admin-txt'>Admin</p>
          <div className='admin-icon-group'>
            <Link to='/admin'>
              <img src='public\images\home_icon.png' alt='홈 아이콘' />
            </Link>
            <Link to='/'>
              <img src='public\images\go_out.png' alt='나가기 아이콘' />
            </Link>
          </div>
          <div className='admin-left-tap'>
            <ul>
              <li
                onClick={() => handleTabClick('main')}
                className={currentTab === 'main' ? 'active-tab' : ''}
              >
                <img src='public\images\home_icon.png' alt='' />
                <p>관리자 메인</p>
              </li>
              <li
                onClick={() => handleTabClick('users')}
                className={currentTab === 'users' ? 'active-tab' : ''}
              >
                <img src='public\images\people_icon.png' alt='' />
                <p>회원관리</p>
              </li>
              <li
                onClick={() => handleTabClick('hotels')}
                className={currentTab === 'hotels' ? 'active-tab' : ''}
              >
                <img src='public\images\house_icon.png' alt='' />
                <p>숙소관리</p>
              </li>
              <li
                onClick={() => handleTabClick('reviews')}
                className={currentTab === 'reviews' ? 'active-tab' : ''}
              >
                <img src='public\images\review_icon.png' alt='' />
                <p>식당 리뷰 관리</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='admin-right-section'>
          <div className='admin-right-side-top'>
            <div className='admin-right-top-tap' style={buttomStyle} onClick={handleToggleLeftTap}>
              <img src='public\images\hamburger.logo.PNG' alt='메뉴 버튼' />
            </div>
            <div className='admin--top-txt'>관리자 메인</div>
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  );
}