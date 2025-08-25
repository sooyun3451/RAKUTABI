import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/sign_in.css';
import axios from 'axios';

export default function SignIn() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChangeId = (e) => setId(e.target.value);
  const handleChangePw = (e) => setPw(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await axios.get('/data/user.json');
      const user = response.data;
      if(user.id === id && user.password === pw) {
        alert(`${user.nickname}님 환영합니다.`);
        localStorage.setItem('user', user);
        navigate('/');
        setError('');
      }else {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="wrapper">
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
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handleChangePw}
        />
      </div>
      <button className="signin-button" onClick={handleSubmit}>로그인</button>
      {error && <p className='error'>{error}</p>}
      <div className="find-signup">
        <Link to="/find">아이디/비밀번호 찾기</Link>
        <Link to="/signUp">회원가입</Link>
      </div>
    </div>
  );
}
