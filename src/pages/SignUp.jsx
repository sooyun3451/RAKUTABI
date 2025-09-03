import React, { useState } from 'react';
import '../css/sign_up.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [signUpInfo, setSignUpInfo] = useState({
    id: '',
    pw: '',
    checkPw: '',
    nickName: '',
    email: '',
    phone: '',
    privacyPolicyAgreed: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    id: '',
    pw: '',
    checkPw: '',
    nickName: '',
    email: '',
    phone: '',
  });

  const passwordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const passwordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const userIdDuplicationCheck = () => {
    const userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,10}$/;
    if (!signUpInfo.id || signUpInfo.id.trim() === '') {
      setErrorMsg((prev) => ({
        ...prev,
        id: '아이디를 입력해주세요.',
      }));
      return;
    }else if (!userIdRegex.test(signUpInfo.id)) {
      setErrorMsg((prev) => ({
        ...prev,
        id: '아이디는 영문 소문자 + 숫자를 포함한 4~10자여야 합니다.',
      }));
      return;
    }else { 
      setErrorMsg((prev) => ({
        ...prev,
        id: '',
      }));
    }
    };

  const userPasswordDuplicationCheck = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,20}$/;
    if(!signUpInfo.pw || signUpInfo.pw.trim() === '') {
      setErrorMsg((prev) => ({
        ...prev,
        pw: '비밀번호를 입력해주세요.'
      }));
      return;
    }

    if(!passwordRegex.test(signUpInfo.pw)) {
      setErrorMsg((prev) => ({
        ...prev,
        pw: '비밀번호는 대소문자 + 숫자 + 특수문자를 포함한 4~20글자여야 합니다.'
      }));
      return;
    }

    setErrorMsg((prev) => ({
      ...prev,
      pw: ''
    }))
  }

  const checkUserPasswordDuplicationCheck = () => {
    if(signUpInfo.pw !== signUpInfo.checkPw) {
      setErrorMsg((prev) => ({
        ...prev,
        checkPw: '비밀번호가 일치하지 않습니다.'
      }));
    }else {
      setErrorMsg((prev) => ({
        ...prev,
        checkPw: ''
      }));
    }
  }

  const userEmailDuplicationCheck = () => {
    const emailRegex = /.+@.+\.com$/;
    if (!emailRegex.test(signUpInfo.email)) {
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
    if (!phoneRegex.test(signUpInfo.phone)) {
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
  if (hasError) {
    alert("입력값을 다시 확인해주세요."); 
    return;
  }

  if(!signUpInfo.id || !signUpInfo.pw || !signUpInfo.checkPw || !signUpInfo.nickName || !signUpInfo.email || !signUpInfo.phone || !signUpInfo.privacyPolicyAgreed) {
    alert('모든항목을 입력하고 개인정보 처리방침에 동의해주세요.');
    return;
  }
    navigate('/');
  };

  return (
    <div id="sign-up-wrapper">
      <p>회원가입</p>
      <div className="id">
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={signUpInfo.id}
          onChange={handleChange}
          onBlur={userIdDuplicationCheck}
        />
        <button onClick={userIdDuplicationCheck}>중복확인</button>
      </div>
      {errorMsg.id && <p className="error-text">{errorMsg.id}</p>}
      <div className="password">
        <input
          type={showPassword1 ? 'text' : 'password'}
          name="pw"
          placeholder="비밀번호"
          value={signUpInfo.pw}
          onChange={handleChange}
          onBlur={userPasswordDuplicationCheck}
        />
        <button type="button" onClick={passwordVisibility1}>
          {showPassword1 ? (
            <img src="/images/view.png" alt="뜬 눈" />
          ) : (
            <img src="/images/hide.png" alt="감은 눈" />
          )}
        </button>
      </div>
      {errorMsg.pw && <p className='error-text'>{errorMsg.pw}</p>}
      <div className="password">
        <input
          type={showPassword2 ? 'text' : 'password'}
          name="checkPw"
          placeholder="비밀번호 확인"
          value={signUpInfo.checkPw}
          onChange={handleChange}
          onBlur={checkUserPasswordDuplicationCheck}
        />
        <button type="button" onClick={passwordVisibility2}>
          {showPassword2 ? (
            <img src="/images/view.png" alt="뜬 눈" />
          ) : (
            <img src="/images/hide.png" alt="감은 눈" />
          )}
        </button>
      </div>
      {errorMsg.checkPw && <p className='error-text'>{errorMsg.checkPw}</p>}
      <input
        type="text"
        name="nickName"
        placeholder="닉네임"
        value={signUpInfo.nickName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={signUpInfo.email}
        onChange={handleChange}
        onBlur={userEmailDuplicationCheck}
      />
      {errorMsg.email && <p className='error-text'>{errorMsg.email}</p>}
      <input
        type="text"
        name="phone"
        placeholder="전화번호"
        value={signUpInfo.phone}
        onChange={handleChange}
        onBlur={userPhoneDuplicationCheck}
      />
      {errorMsg.phone && <p className='error-text'>{errorMsg.phone}</p>}
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          name="privacyPolicyAgreed"
          id="privacy"
          checked={signUpInfo.privacyPolicyAgreed}
          onChange={handleChange}
        />
        <label htmlFor="privacy">동의합니다</label>
      </div>
      <div className="privacy-box">
        <p>
          [개인정보 처리방침]
          <br />
          수집하는 개인정보 항목: 아이디, 비밀번호, 이메일, 전화번호 등<br />
          수집 목적: 회원가입 및 서비스 제공
          <br />
          보관 기간: 회원 탈퇴 시까지
          <br />
          ...
        </p>
      </div>
      <button onClick={handleSubmit}>회원가입</button>
    </div>
  );
}
