import React, { useEffect, useState } from 'react';
import '../css/my_page.css';
import { useNavigate } from 'react-router-dom';

export default function MyPage({ isCheck, user }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('review');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [nickName, setNickName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errorMsg, setErrorMsg] = useState({
    pw: '',
    checkPw: '',
    nickName: '',
    email: '',
    phone: '',
  });

  const maskPassword = (password) => {
    if (!password) return '';
    return password[0] + '*'.repeat(password.length - 1);
  };

  const passwordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const passwordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
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
    if (confirm('정말 계정을 삭제하시겠습니까?')) {
      navigate('/');
    }
  };

  const userPasswordDuplicationCheck = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,20}$/;
    if (!pw || pw.trim() === '') {
      setErrorMsg((prev) => ({
        ...prev,
        pw: '비밀번호를 입력해주세요.',
      }));
      return;
    }

    if (!passwordRegex.test(pw)) {
      setErrorMsg((prev) => ({
        ...prev,
        pw: '비밀번호는 대소문자 + 숫자 + 특수문자를 포함한 4~20글자여야 합니다.',
      }));
      return;
    }

    setErrorMsg((prev) => ({
      ...prev,
      pw: '',
    }));
  };

  const checkUserPasswordDuplicationCheck = () => {
    if (pw !== checkPw) {
      setErrorMsg((prev) => ({
        ...prev,
        checkPw: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrorMsg((prev) => ({
        ...prev,
        checkPw: '',
      }));
    }
  };

    const userEmailDuplicationCheck = () => {
    const emailRegex = /.+@.+\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMsg((prev) => ({
        ...prev,
        email: '유효한 이메일 주소를 입력해 주세요.',
      }));
    }else {
      setErrorMsg((prev) => ({
        ...prev, email: ''
      }))
    }
  };

  const userPhoneDuplicationCheck = () => {
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMsg((prev) => ({
        ...prev,
        phone: '유효한 번호를 입력해주세요.',
      }));
    }else {
      setErrorMsg((prev) => ({
        ...prev, phone: ''
      }))
    }
  };

  const handleSubmit = () => {
    const hasError = Object.values(errorMsg).some((msg) => msg !== "");
    if(hasError) {
      alert('입력값을 다시 확인해주세요.');
      return;
    }

    if(!id || !pw || !checkPw || !nickName || !email || !phone) {
      alert('모든항목을 입력해주세요.');
      return;
    }
    navigate('/myPage');
  }

  const handleChangeId = (e) => setId(e.target.value);
  const handleChangePw = (e) => setPw(e.target.value);
  const handleChangeCheckPw = (e) => setCheckPw(e.target.value);
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
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file"
            />
          )}
        </div>
        <div>
          {isCheck ? (
            <div className="view-mode">
              <p>아이디: {user.id}</p>
              <p>비밀번호: {maskPassword(user?.password)}</p>
              <p>닉네임: {user.nickName}</p>
              <p>이메일: {user.email}</p>
              <p>전화번호: {user.phone}</p>
            </div>
          ) : (
            <div className="edit-mode">
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
                <label htmlFor="password">비밀번호:</label>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  name="password"
                  value={pw}
                  onChange={handleChangePw}
                  onBlur={userPasswordDuplicationCheck}
                />
                <button type="button" onClick={passwordVisibility1}>
                  {showPassword1 ? (
                    <img src="/images/view.png" alt="뜬눈" />
                  ) : (
                    <img src="/images/hide.png" alt="감은 눈" />
                  )}
                </button>
              </p>
              {errorMsg.pw && <p className='error-text'>{errorMsg.pw}</p>}
              <p>
                <label htmlFor="password">비밀번호 확인:</label>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  name="password"
                  value={checkPw}
                  onChange={handleChangeCheckPw}
                  onBlur={checkUserPasswordDuplicationCheck}
                />
                <button type="button" onClick={passwordVisibility2}>
                  {showPassword2 ? (
                    <img src="/images/view.png" alt="뜬눈" />
                  ) : (
                    <img src="/images/hide.png" alt="감은 눈" />
                  )}
                </button>
              </p>
              {errorMsg.checkPw && <p className='error-text'>{errorMsg.checkPw}</p>}
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
                  onBlur={userEmailDuplicationCheck}
                />
              </p>
              {errorMsg.email && <p className='error-text'>{errorMsg.email}</p>}
              <p>
                전화번호:{' '}
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleChangePhone}
                  onBlur={userPhoneDuplicationCheck}
                />
              </p>
              {errorMsg.phone && <p className='error-text'>{errorMsg.phone}</p>}
            </div>
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
          <button onClick={handleSubmit}>수정 완료</button>
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
