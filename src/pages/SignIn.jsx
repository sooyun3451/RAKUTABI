import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/sign_in.css';
import axios from 'axios';

export default function SignIn() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangeId = (e) => setId(e.target.value);
  const handleChangePw = (e) => setPw(e.target.value);

  const passwordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.get('/data/user.json');
      const user = response.data;
      if(user.id !== id) {
        setError('해댱 아이디의 유저가 존재하지 않습니다.');
        return;
      };

      if(user.password != pw) {
        setError('비밀번호가 올바르지 않습니다.');
        return;
      };

        alert(`${user.nickName}님 환영합니다.`);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
        setError('');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="sign-in-wrapper">
      <p className="title">로그인</p>
      <div className="id">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={handleChangeId}
        />
      </div>
      <div className="pw">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={pw}
          onChange={handleChangePw}
        />
      <button type="button" onClick={passwordVisibility}>
        {showPassword ? (
          <img src="/images/view.png" alt="뜬 눈" />
        ) : (
          <img src="/images/hide.png" alt="감은 눈" />
        )}
      </button>
      </div>
      <button className="signin-button" onClick={handleSubmit}>
        로그인
      </button>
      {error && <p className="error">{error}</p>}
      <div className="find-signup">
        <Link to="/find">아이디/비밀번호 찾기</Link>
        <Link to="/signUp">회원가입</Link>
      </div>
    </div>
  );
}
