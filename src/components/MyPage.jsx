import React, { useEffect, useState } from 'react';
import '../css/my_page.css';
import { useNavigate } from 'react-router-dom';

export default function MyPage({ isCheck, user, onUpdatedUser }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('review');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const maskPassword = (password) => {
    if (!password) return '';
    return password[0] + '*'.repeat(password.length - 1);
  };

  useEffect(() => {
    if (!isCheck) {
      setId(user.id ?? '');
      setPw(user.password ?? '');
      setNickName(user.nickName ?? '');
      setPhoto(user.photo ?? '');
      setEmail(user.email ?? '');
      setPhone(user.phone ?? '');
    }
  }, [isCheck, user]);

  const handleSave = () => {
    const updatedUser = { id, password: pw, nickName, photo, email, phone };
    if (onUpdatedUser) {
      onUpdatedUser(updatedUser);
    }
    navigate('/myPage');
  };

  const handleCancel = () => {
    setId(user.id ?? '');
    setPw(user.password ?? '');
    setNickName(user.nickName ?? '');
    setPhoto(user.photo ?? '');
    setEmail(user.email ?? '');
    setPhone(user.phone ?? '');
    if (confirm('수정을 취소하시겠습니까?')) {
      navigate('/myPage');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteaccount = () => {
    if(confirm('정말 계정을 삭제하시겠습니까?')) {
      navigate('/');
    }
  }

  const handleChangeId = (e) => setId(e.target.value);
  const handleChangePw = (e) => setPw(e.target.value);
  const handleChangeNickName = (e) => setNickName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePhone = (e) => setPhone(e.target.value);

  return (
    <div id="my-page-wrapper">
      <h2>마이페이지</h2>
      <div className="info">
        <div>
          <img
            src={photo || '/images/user-icon.jpeg'}
            alt="usericon"
            className="icon"
          />

          {!isCheck && (
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          )}
        </div>
        <div>
          {isCheck ? (
            <>
              <p>아이디: {user.id}</p>
              <p>비밀번호: {maskPassword(user?.password)}</p>
              <p>닉네임: {user.nickName}</p>
              <p>이메일: {user.email}</p>
              <p>전화번호: {user.phone}</p>
            </>
          ) : (
            <>
              <p>
                아이디:{' '}
                <input
                  type="text"
                  name="id"
                  value={id}
                  onChange={handleChangeId}
                  disabled
                />
              </p>
              <p>
                비밀번호:{' '}
                <input
                  type="password"
                  name="password"
                  value={pw}
                  onChange={handleChangePw}
                />
              </p>
              <p>
                닉네임:{' '}
                <input
                  type="text"
                  name="nickName"
                  value={nickName}
                  onChange={handleChangeNickName}
                />
              </p>
              <p>
                이메일:{' '}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </p>
              <p>
                전화번호:{' '}
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </p>
            </>
          )}
        </div>
      </div>
      {isCheck ? (
        <div className="account-buttons">
          <button onClick={() => navigate('/myPage/edit')}>계정 수정</button>
          <button onClick={handleDeleteaccount}>계정 삭제</button>
        </div>
      ) : (
        <div className="account-buttons">
          <button onClick={handleSave}>수정 완료</button>
          <button onClick={handleCancel}>수정 취소</button>
        </div>
      )}
      {isCheck && (
        <div className="my-tabs">
          <div className="tab-header">
            <button
              className={activeTab === 'review' ? 'active' : ''}
              onClick={() => setActiveTab('review')}
            >
              내가 작성한 리뷰
            </button>
            <button
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              찜 목록
            </button>
            <button
              className={activeTab === 'booking' ? 'active' : ''}
              onClick={() => setActiveTab('booking')}
            >
              내가 예약한 숙소
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'review' && (
              <>
                <div className="tab-item">
                  <p className="item-title">라멘야</p>
                  <p className="item-date">2025-08-21</p>
                  <div className="item-buttons">
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'wishlist' && (
              <>
                <div className="tab-item">
                  <p className="item-title">미야코 시티 오사카 혼마치</p>
                  <p className="item-date">2025-08-21</p>
                  <div className="item-buttons">
                    <button>삭제</button>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'booking' && (
              <>
                <div className="tab-item">
                  <p className="item-title">일쿠오레 난바 호텔</p>
                  <p className="item-date">2025-08-21</p>
                  <div className="item-buttons">
                    <button>삭제</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
